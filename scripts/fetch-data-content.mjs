import * as fs from "fs";
import axios from "axios";
import {writeFile} from "./utils.mjs";

const STRAPI_URL = 'https://37b6-14-181-208-33.ngrok-free.app';
const savePath = (folder, fileName) => `data/${folder}/${fileName}`;
const savePathFolder = (folder) => `data/${folder}`;

const fetchAndProcessData = async (url) => {
    const results = await axios.get(url);
    return results.data;
}
const createContentToFile = async (folderName, fileName, content) => {
        const folderPath = savePathFolder(folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, {recursive: true});
        }
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
            const fileName = `${locale}${isProduction ? '' : '-preview'}.md`;
            console.log(folderName, fileName)
            acc.push(createContentToFile(folderName, fileName, content));
            })
        }
      return acc;
    }, [])
    await Promise.all(promiseList);
}

main().catch((error) => console.error(error));
