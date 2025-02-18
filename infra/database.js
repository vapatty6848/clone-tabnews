import { Client } from "pg";

async function query(queryObject) {
  let client;
  console.log({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  })

  try {
    client = await getNewClient()
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {

    return {
      ca: process.env.POSTGRES_CA,
    }
  }
 /*  testando que o jest esta em ambient de test e next em desenvolvimento 
 return process.env.NODE_ENV ==="production" ? true : false */
 
  console.log("NODE_ENV: "+  process.env.NODE_ENV);
  return process.env.NODE_ENV ==="production" ? true : false
}


