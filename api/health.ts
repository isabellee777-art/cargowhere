import type { IncomingMessage, ServerResponse } from 'http';

interface ExtendedRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  method?: string;
}

interface ExtendedResponse extends ServerResponse {
  status?: (code: number) => ExtendedResponse;
  json?: (data: unknown) => void;
}

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
 * Serverless Health Check Endpoint
 * Route: /api/health
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

  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY || process.env.ACCOUNT_KEY);

  const payload = {
    status: 'ok',
    service: 'ParkSG Singapore Carpark Availability API',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: {
      nodeVersion: process.version,
      ltaKeyConfigured: hasLtaKey
    },
    endpoints: {
      carparkAvailability: '/api/carparkavailability',
      ltaSource: 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2'
    }
  };

  sendJson(res, 200, payload);
}
