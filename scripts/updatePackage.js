const {ApiPromise, WsProvider} = require('@polkadot/api');
const fs = require('fs/promises');
const pkgJson = require('../package.json');

async function main() {
    const {version, oldVersion} = pkgJson;
    if (version === oldVersion) {
        pkgJson.buildNumber = parseInt(pkgJson.buildNumber) + 1;
    }else {
        pkgJson.buildNumber = 1;
        pkgJson.oldVersion = version;
    }
    console.log('a')
    await fs.writeFile('package.json', JSON.stringify(pkgJson, null, 2));
    console.log(`You are update build number to ${pkgJson.buildNumber} `)
}

main().catch(console.error).finally(() => process.exit());
