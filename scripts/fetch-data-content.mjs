import * as fs from "fs";
import axios from "axios";
import path from "path";
import {writeFile, writeJSONFile} from "./utils.mjs";

const STRAPI_URL = 'https://37b6-14-181-208-33.ngrok-free.app';
const RESOURCE_URL = 'https://static-data.subwallet.app';
const savePath = (folder, fileName) => `data/${folder}/${fileName || 'list.json'}`;
const savePathFolder = (folder, fileName) => `data/${folder}`;
const saveImagesPath = (folder) => `data/${folder}/images`;
const urlImage = (folder, field, name) => `${RESOURCE_URL}/${folder}/images/${field}/${name}`;

export async function downloadFile(url, downloadDir, forceFileName = null) {
    // Create dir if not exist
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, {recursive: true});
    }

    // Download file with axios
    let fileName = url.split('/').pop();
    if (forceFileName) {
        fileName = forceFileName + '.' + fileName.split('.').pop();
    }
    const filePath = path.join(downloadDir, fileName);

    // Download and save file
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return await new Promise((resolve, reject) => {
        writer.on('finish', () => {
            resolve(fileName);
        });
        writer.on('error', () => {
            resolve(url);
        });
    });
}

const fetchAndProcessData = async (url) => {
    const results = await axios.get(url);
    const data = results.data;
    return data;
    // if (!results.data) return;
    //
    // return await Promise.all(results.data.map(async item => {
    //     const dataImages = {};
    //     for (const field of fieldsImage) {
    //         const dataField = item[field];
    //         if (dataField) {
    //             const folderFieldImage = `${downloadDir}/${field}`;
    //             const newFileName = await downloadFile(dataField, folderFieldImage);
    //             dataImages[field] = urlImage(folder, field, newFileName);
    //         }
    //     }
    //     return {...item, ...dataImages};
    // }));
}
const createData = async (folderName, fileName, content) => {
        const folderPath = savePathFolder(folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, {recursive: true});
        }
        // const fileName = `${item.slug}.json`;
        const filePath = savePath(folderName, fileName);
        await writeFile(filePath, content);
}

const main = async () => {
    console.log('Start fetching data...');
    const url =  `${STRAPI_URL}/api/list/content-i18n`
    const dataContent = await fetchAndProcessData(url);

    const environment = process.argv[2];
    const isProduction = environment === 'production';
    const promiseList = Object.entries(dataContent).reduce((acc, [key, value]) => {
        if (value.length > 0) {
            value.forEach((item) => {
                const {folderName, locale, content} = item;
            const fileName = `${locale}.md`;
            console.log(folderName, fileName)
            acc.push(createData(folderName, fileName, content));
            })
        }
      return acc;
    }, [])
    await Promise.all(promiseList);
    // console.log(dataContent);
    // for (const item of dataContent) {
    //     const {folderName, fileName, content} = item;
    //     console.log(folderName, fileName);
    //     const folderPath = savePathFolder(folderName);
    //     if (!fs.existsSync(folderPath)) {
    //         fs.mkdirSync(folderPath, {recursive: true});
    //     }
    //     // const fileName = `${item.slug}.json`;
    //     const filePath = savePath(folderName, fileName);
    //     await writeFile(filePath, content);
    // }
}

main().catch((error) => console.error(error));
