const dotenv = require("dotenv");

dotenv.config({
  path:".env.development",
});

const nextJest = require("next/jest");



const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>" ],
  testTimeout: 1000 * 60 *  1,
  maxWorkers: 4,
  cache: true,
});


module.exports = jestConfig;


/* o jest só ira carregar as variaveis de ambiente apos configurar o dropIndex, mas 
neste caso nossa variavel esta em .env.develop, então precisamos indicar o caminho */