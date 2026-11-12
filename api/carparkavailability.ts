import type { IncomingMessage, ServerResponse } from 'http';

interface ExtendedRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  url?: string;
  method?: string;
}

interface ExtendedResponse extends ServerResponse {
  status?: (code: number) => ExtendedResponse;
  json?: (data: unknown) => void;
}

export interface LTACarparkItem {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string; // "latitude longitude" e.g. "1.2934 103.8572"
  AvailableLots: number;
  LotType: 'C' | 'H' | 'Y'; // C: Cars, H: Heavy, Y: Motorcycles
  Agency: 'HDB' | 'LTA' | 'URA';
}

export interface LTACarparkResponse {
  'odata.metadata'?: string;
  value: LTACarparkItem[];
}

const LTA_DATAMALL_ENDPOINT = 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2';

function sendJson(res: ExtendedResponse, statusCode: number, data: unknown) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(statusCode);
    res.json(data);
  } else {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data, null, 2));
  }
}

/**
 * Serverless Carpark Availability Endpoint
 * Route: /api/carparkavailability
 *
 * Fetches real-time lot availability from Singapore LTA DataMall v2:
 * https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2
 * Required Header: AccountKey: <LTA_ACCOUNT_KEY>
 */
export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Parse query params if available
  const parsedUrl = new URL(req.url || '/api/carparkavailability', 'http://localhost');
  const skipParam = parsedUrl.searchParams.get('$skip') || parsedUrl.searchParams.get('skip');
  const fetchAll = parsedUrl.searchParams.get('all') === 'true';

  // Read LTA Account Key from environment variable (do not hardcode) or incoming header
  const accountKey =
    process.env.LTA_ACCOUNT_KEY ||
    process.env.ACCOUNT_KEY ||
    process.env.AccountKey ||
    (req.headers['accountkey'] as string) ||
    (req.headers['account-key'] as string);

  if (!accountKey) {
    const errorPayload = {
      status: 'error',
      code: 'MISSING_LTA_KEY',
      message:
        'LTA_ACCOUNT_KEY is not configured. Please set the LTA_ACCOUNT_KEY environment variable in your deployment settings or .env file.',
      endpoint: LTA_DATAMALL_ENDPOINT,
      requiredHeader: 'AccountKey',
      timestamp: new Date().toISOString()
    };

    sendJson(res, 503, errorPayload);
    return;
  }

  try {
    if (fetchAll) {
      // LTA returns 500 records per page. Loop until all records are retrieved.
      let allCarparks: LTACarparkItem[] = [];
      let currentSkip = 0;
      let hasMore = true;

      while (hasMore && currentSkip < 5000) {
        const pageUrl = `${LTA_DATAMALL_ENDPOINT}?$skip=${currentSkip}`;
        const response = await fetch(pageUrl, {
          headers: {
            AccountKey: accountKey,
            Accept: 'application/json'
          }
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`LTA DataMall responded with ${response.status}: ${errText}`);
        }

        const data: LTACarparkResponse = await response.json();
        const records = data.value || [];
        allCarparks = allCarparks.concat(records);

        if (records.length < 500) {
          hasMore = false;
        } else {
          currentSkip += 500;
        }
      }

      const responsePayload = {
        status: 'success',
        source: 'LTA DataMall CarParkAvailabilityv2',
        timestamp: new Date().toISOString(),
        totalRecords: allCarparks.length,
        value: allCarparks
      };

      sendJson(res, 200, responsePayload);
      return;
    }

    // Single page fetch (default or with specific $skip)
    const targetUrl = skipParam
      ? `${LTA_DATAMALL_ENDPOINT}?$skip=${encodeURIComponent(skipParam)}`
      : LTA_DATAMALL_ENDPOINT;

    const response = await fetch(targetUrl, {
      headers: {
        AccountKey: accountKey,
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`LTA DataMall responded with ${response.status}: ${errText}`);
    }

    const data: LTACarparkResponse = await response.json();

    const responsePayload = {
      status: 'success',
      source: 'LTA DataMall CarParkAvailabilityv2',
      timestamp: new Date().toISOString(),
      count: data.value ? data.value.length : 0,
      value: data.value || []
    };

    sendJson(res, 200, responsePayload);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error querying LTA DataMall';
    const errorPayload = {
      status: 'error',
      message: errorMessage,
      endpoint: LTA_DATAMALL_ENDPOINT,
      timestamp: new Date().toISOString()
    };

    sendJson(res, 502, errorPayload);
  }
}
