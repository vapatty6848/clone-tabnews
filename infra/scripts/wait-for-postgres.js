

const { exec } = require("node:child_process")

function checkPostegres() {
exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

function handleReturn(erro, stdout) {
  if(stdout.search('accepting connections')=== -1) {
    process.stdout.write('.');
    checkPostegres();
    return;
  }
   console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
}
}

process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões");

checkPostegres()
