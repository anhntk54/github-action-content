const {ApiPromise, WsProvider} = require('@polkadot/api');
const fs = require('fs/promises');
const networkMap = {
    'gemini-3f': 'wss://rpc-0.gemini-3f.subspace.network/ws',
    'gemini-1b': 'wss://eu.gemini-1b.subspace.network/ws',
    'gemini-2a': 'wss://eu-0.gemini-2a.subspace.network/ws',
    'gemini-3g': 'wss://rpc-0.gemini-3g.subspace.network/ws',
    'sora-staging': 'wss://ws.framenode-4.s2.stg1.sora2.soramitsu.co.jp',
    'tangle': 'wss://rpc-archive.tangle.tools',
    'ternoa': 'wss://alphanet.ternoa.com'
}

async function getData(key, url) {
    const provider = new WsProvider(url);
    //
    // // Create the API and wait until ready
    const api = await ApiPromise.create({provider});
    console.log('123456')
    let totalSize = '0'
    if (key.includes('gemini')) {

        totalSize = api.consts.transactionFees.totalSpacePledged;
    } else {
        totalSize = await api.query.system.number();
    }
    const data = {
        total_size_network: totalSize.toString(),
        usd: 0.01
    }
    console.log('1123456')
    console.log('data', data)
    return data;
    //
    // await fs.writeFile('data/netWorkInfo.json', JSON.stringify(data, null, 2));
    // console.log(`You are connected to and save totalSpacePledged with value:${totalSpacePledged}`);
}

async function main() {
    // Object.entries(networkMap).forEach(async ([networkName, networkUrl]) => {
    //     console.log('networkName', networkName)
    //     console.log('networkUrl', networkUrl)
    //     const a = await getData(networkUrl);
    //     console.log('a', a)
    //     // console.log(`You are connected to and save totalSpacePledged with value:${totalSpacePledged}`);
    // })
    const dataJSon = {};
    for (const [name, url] of Object.entries(networkMap)) {
        console.log('networkMapElement', url)
        const value = await getData(name, url);
        dataJSon[name] = value;
    }
    // const a = await getData(networkMap['gemini-3f']);
    //     console.log('a', a)
    // const b = await getData(networkMap['gemini-1b']);
    //     console.log('b', b)
    // Initialise the provider to connect to the local node
    // const provider = new WsProvider('wss://rpc-0.gemini-3f.subspace.network/ws');
    //
    // // Create the API and wait until ready
    // const api = await ApiPromise.create({ provider });
    // const totalSpacePledged = api.consts.transactionFees.totalSpacePledged;
    // const data = {
    //   total_size_network: totalSpacePledged.toString(),
    //   usd: 0.01
    // }
    //
    await fs.writeFile('src/data/netWorkInfo.json', JSON.stringify(dataJSon, null, 2));
    // console.log(`You are connected to and save totalSpacePledged with value:${totalSpacePledged}`);
}

main().catch(console.error).finally(() => process.exit());
