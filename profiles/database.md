# Database profile

Use for relational, document, and other persistent stores; adapt the questions to the actual technology.

- Trace data integrity through schema, constraints, migrations, uniqueness, deletion, and references.
- Check permissions and data isolation at the layers the project actually uses.
- If PostgreSQL or Supabase row-level security is part of the access model, check policies and whether application roles can bypass them.
- Review transactions, concurrent writes, repeated requests, and recovery from partial failures.
- For performance or operations, assess important queries and indexes only when supported by workload data or a query plan.
- Mark backups and recovery `Not verified` unless there is evidence of their actual configuration or testing.

## Performance checks

- Trace query counts across representative flows for N+1 patterns, repeated queries, unnecessary columns or rows, and pagination behavior as data grows.
- Use available execution plans and representative data to assess scan and join work, sorting and relevant indexes. An absent index alone is not a finding.
- Review transaction duration, lock contention and pool waits using available evidence. Run query analysis that executes statements only against an isolated test database.

## Architecture checks

- Map ownership of important data, write paths and invariants. Assess shared schema access and transaction boundaries against actual consistency requirements.
- Where components deploy independently, review schema evolution and migration coordination for a concrete contract risk. Do not assume a shared database requires splitting.
