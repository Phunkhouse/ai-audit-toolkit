# Database profile

Use for relational, document, and other persistent stores; adapt the questions to the actual technology.

- Trace data integrity through schema, constraints, migrations, uniqueness, deletion, and references.
- Check permissions and data isolation at the layers the project actually uses.
- Review transactions, concurrent writes, repeated requests, and recovery from partial failures.
- For performance or operations, assess important queries and indexes only when supported by workload data or a query plan.
- Mark backups and recovery `Not verified` unless there is evidence of their actual configuration or testing.
