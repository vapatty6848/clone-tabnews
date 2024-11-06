import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dataBaseName = process.env.POSTGRES_DB;

 const dataPostgresVersion = await database.query("SHOW server_version;");
  const postgresVersion = dataPostgresVersion.rows[0].server_version;

  const dataMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = dataMaxConnections.rows[0].max_connections;

  const databaseOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dataBaseName],
  });

  const openedConnections = databaseOpenedConnections.rows[0].count;

  const result = response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
