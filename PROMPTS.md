# Project Prompts Log

This document records all user prompts submitted during the development of the ParkSG application in chronological order.

---

### Prompt 1: Initial Application Build
**Date / Time:** 2026-11-12T01:11:09-08:00

```text
Build a singapore based carpark application that tracks real time carpark lots availability. build just the frontend for now, I will integrate backend later.
```

**Scope Delivered:**
- Built full React + Tailwind CSS frontend application for Singapore carparks (`ParkSG`).
- Integrated live public data from `data.gov.sg` Carpark Availability API.
- Implemented interactive Leaflet map with district jumping, availability color-coded markers, and GPS proximity locator.
- Created directory view, rate estimator, saved favorites watchlist, and backend integration guide.

---

### Prompt 2: GitHub Repository Setup & Push
**Date / Time:** 2026-11-12T01:19:32-08:00

```text
git push https://ghp_[REDACTED_GITHUB_TOKEN]@github.com/isabellee777-art/cargowhere
```

*(Note: Original prompt provided personal access token which was used to authenticate and then removed from git remote configuration for security).*

**Scope Delivered:**
- Initialized git repository.
- Created root commit with all project files.
- Added remote origin and pushed `main` branch to [github.com/isabellee777-art/cargowhere](https://github.com/isabellee777-art/cargowhere).
- Sanitized remote URL in `.git/config` to remove embedded token.

---

### Prompt 3: LTA DataMall v2 Serverless Connection
**Date / Time:** 2026-11-12T01:38:49-08:00

```text
1. Add a serverless connection that pulls live data from LTA's datamall using the following endpoint:

# Live carpark lots (HDB, LTA and URA):
https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2

# Every request needs the header:  AccountKey: <LTA_ACCOUNT_KEY>

2. store this in /api folder at project root level (not the src file)

3. include /health.ts and /carparkavailability.ts within the same sub folder

4. do not hardcode any key, I will input them later
```

**Scope Delivered:**
- Created `/api/carparkavailability.ts` at the project root level connecting to LTA DataMall v2.
- Injected `AccountKey` header dynamically from `process.env.LTA_ACCOUNT_KEY` without hardcoding any secrets.
- Created `/api/health.ts` health check probe verifying service status and environment key presence.
- Updated `.env.example` with `LTA_ACCOUNT_KEY` documentation.
- Connected client service (`src/services/carparkService.ts`) to query `/api/carparkavailability` when deployed.

---

### Prompt 4: Collate Prompts
**Date / Time:** 2026-11-12T01:47:35-08:00

```text
collate all of the prompts and store them as a PROMPTS.md file
```

**Scope Delivered:**
- Generated `PROMPTS.md` collating all conversation prompts, timestamps, and delivered feature scopes.
