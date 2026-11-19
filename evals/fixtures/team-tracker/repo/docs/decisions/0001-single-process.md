# 1. Run as a single process

Status: accepted, 2026-08-14

## Context

The tracker serves a few hundred users from one small VM behind a reverse proxy. The proxy appends the client address to `X-Forwarded-For`.

## Decision

Run one Node process. Keep sessions, the search index, caches and rate-limit counters in memory. Restarts lose rate-limit counters and caches, which is acceptable. Persistent data is snapshotted to disk every minute (not part of this repository).

## Consequences

Horizontal scaling needs shared storage for caches and limits; revisit above roughly 2,000 active users.
