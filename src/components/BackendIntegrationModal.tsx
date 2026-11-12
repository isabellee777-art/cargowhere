import React, { useState } from 'react';
import { X, Code2, Server, Database, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

interface BackendIntegrationModalProps {
  onClose: () => void;
}

export const BackendIntegrationModal: React.FC<BackendIntegrationModalProps> = ({ onClose }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'endpoints' | 'lta' | 'serverTemplate'>('endpoints');

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const sampleEndpointJson = `{
  "status": "success",
  "data": [
    {
      "id": "MBS",
      "carparkNo": "MBS01",
      "name": "Marina Bay Sands",
      "agency": "Commercial",
      "address": "10 Bayfront Ave, Singapore 018956",
      "coordinates": { "lat": 1.2834, "lng": 103.8607 },
      "totalLots": 1250,
      "availableLots": 312,
      "status": "moderate",
      "occupancyPercent": 75,
      "lotBreakdown": {
        "cars": { "total": 1100, "available": 268 },
        "motorcycles": { "total": 150, "available": 44 }
      },
      "evCharging": {
        "hasEV": true,
        "totalChargers": 16,
        "availableChargers": 5
      },
      "rates": {
        "weekdayPeak": "$3.50 for 1st hr, $1.80/30m subsequent",
        "weekdayPeakRatePer30Min": 1.80,
        "gracePeriodMins": 10
      },
      "lastUpdated": "2026-11-12T09:15:00.000Z"
    }
  ]
}`;

  const expressServerCode = `// server.ts - Future backend integration example
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Data.gov.sg Public Carpark Availability
app.get('/api/v1/carparks/hdb-live', async (req, res) => {
  try {
    const response = await axios.get('https://api.data.gov.sg/v1/transport/carpark-availability');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch HDB carpark data' });
  }
});

// 2. Singapore LTA DataMall v2 Carpark Lots
app.get('/api/v1/carparks/lta-mall', async (req, res) => {
  const ltaKey = process.env.LTA_DATAMALL_KEY;
  try {
    const response = await axios.get('http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2', {
      headers: { 'AccountKey': ltaKey }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to query LTA DataMall' });
  }
});

app.listen(PORT, () => {
  console.log(\`ParkSG Backend running on port \${PORT}\`);
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Backend Integration Guide</h2>
              <p className="text-xs text-slate-500">API contract, endpoints & Singapore Gov APIs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`pb-3 px-1 border-b-2 transition-all ${
              activeTab === 'endpoints'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            REST API Schema
          </button>
          <button
            onClick={() => setActiveTab('lta')}
            className={`pb-3 px-1 border-b-2 transition-all ${
              activeTab === 'lta'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Singapore Official Sources
          </button>
          <button
            onClick={() => setActiveTab('serverTemplate')}
            className={`pb-3 px-1 border-b-2 transition-all ${
              activeTab === 'serverTemplate'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Express Route Template
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-4 text-xs">
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Frontend Service Hook</span>
                <p className="text-slate-600 mt-1">
                  The frontend is structured with <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">/src/services/carparkService.ts</code>. You can easily switch its target from client fetch to your custom backend route <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">/api/v1/carparks</code> whenever your backend is live.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-800">Expected JSON Response Structure</span>
                  <button
                    onClick={() => copyCode(sampleEndpointJson, 'json')}
                    className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedTab === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy JSON
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto max-h-64">
                  {sampleEndpointJson}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'lta' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  1. Data.gov.sg Real-Time Carpark Availability
                </div>
                <p className="text-slate-600 mb-2">
                  Public, free REST API updated every 60 seconds with live HDB electronic carpark lots across all estates.
                </p>
                <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-[11px] text-slate-800 flex justify-between items-center">
                  <span>GET https://api.data.gov.sg/v1/transport/carpark-availability</span>
                  <a
                    href="https://beta.data.gov.sg/datasets/d_23f06329d43f8060b4f0b2f90fb7858c/view"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 text-[10px]"
                  >
                    Doc <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <Database className="w-4 h-4 text-rose-600" />
                  2. LTA DataMall v2 Car Park Availability
                </div>
                <p className="text-slate-600 mb-2">
                  Covers shopping malls, commercial complexes, and Orchard/CBD carparks (requires free developer AccountKey).
                </p>
                <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-[11px] text-slate-800">
                  GET http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2
                  <div className="text-[10px] text-slate-500 mt-1">Header: AccountKey: &lt;YOUR_LTA_KEY&gt;</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'serverTemplate' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Ready Express Server Code</span>
                <button
                  onClick={() => copyCode(expressServerCode, 'express')}
                  className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-mono text-[11px]"
                >
                  {copiedTab === 'express' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Code
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto max-h-72">
                {expressServerCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
