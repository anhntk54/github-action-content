const fs = require('fs/promises');
const pkgJson = require('../package.json');

async function main() {
    const {version, buildNumber} = pkgJson;
    const textVersion = version.replaceAll('.', '')
    if (buildNumber.startsWith(textVersion)) {
        pkgJson.buildNumber = parseInt(buildNumber) + 1;
    }else {
        pkgJson.buildNumber = `${textVersion}001`;
    }
    console.log('a')
    await fs.writeFile('package.json', JSON.stringify(pkgJson, null, 2));
    console.log(`You are update build number to ${pkgJson.buildNumber} `)
}

main().catch(console.error).finally(() => process.exit());
