const {ApiPromise, WsProvider} = require('@polkadot/api');
const fs = require('fs/promises');
const pkgJson = require('../package.json');

async function main() {
    pkgJson.buildNumber = parseInt(pkgJson.buildNumber) + 1;
    console.log(pkgJson)
    await fs.writeFile('package.json', JSON.stringify(pkgJson, null, 2));
    console.log(`You are update build number to ${pkgJson.buildNumber} `)
}

main().catch(console.error).finally(() => process.exit());
