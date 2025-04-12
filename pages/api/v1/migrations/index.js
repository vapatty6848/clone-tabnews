import migrationRunner from 'node-pg-migrate'
import { join } from  'node:path'
import database from "infra/database.js"

/* fazer uma variavel para as configurações da migrationRunner, e no post usar spreed e setar 
dryRun false */
export default async function migrations(request, response) {
 
  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
  }
  
  if(request.method === 'GET') {
    console.log("Method GET entrou!!")
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions)
    await dbClient.end();
  return response.status(200).json(pendingMigrations);
  }

  if(request.method === 'POST') {
     console.log("method POST entrou !!")
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
  });

  await dbClient.end();

  if(migratedMigrations.length > 0 ){
    return response.status(201).json(migratedMigrations)
  }

  return response.status(200).json(migratedMigrations);
  }
  
  return response.status(405).end();
};
