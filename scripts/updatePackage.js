const fs = require('fs/promises');
const pkgJson = require('../package.json');
function getBuildNumber(number) {
    if (number < 10) {
        return `00${number}`
    }
    if (number < 100) {
        return `0${number}`
    }
    return number;
}

async function main() {
    const {version, buildNumber} = pkgJson;
    const textVersion = version.replaceAll('.', '')
    if (buildNumber.startsWith(textVersion)) {
        const buildNumberWithoutVersion = buildNumber.replaceAll(textVersion, '');
        pkgJson.buildNumber = `${textVersion}${getBuildNumber(parseInt(buildNumberWithoutVersion) + 1)}`;
    }else {
        pkgJson.buildNumber = `${textVersion}001`;
    }
    await fs.writeFile('package.json', JSON.stringify(pkgJson, null, 2));
    console.log(`You are update build number to ${pkgJson.buildNumber} `)
}

main().catch(console.error).finally(() => process.exit());
