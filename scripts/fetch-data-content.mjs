import * as fs from "fs";
import axios from "axios";
import {writeFile} from "./utils.mjs";

const STRAPI_URL = 'https://b063-14-181-208-33.ngrok-free.app';
const savePath = (folderParent, folder, fileName) => `data/${folderParent}/${folder}/${fileName}`;
const savePathFolder = (folderParent, folder) => `data/${folderParent}/${folder}`;

const fetchAndProcessData = async (url) => {
    const results = await axios.get(url);
    return results.data;
}
const createContentToFile = async (folderParent, folderName, fileName, content) => {
    const folderPath = savePathFolder(folderParent, folderName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {recursive: true});
    }
    const filePath = savePath(folderParent, folderName, fileName);
    await writeFile(filePath, content);
}

const createContentToJSONFile = async (folderName, fileName, content, locale) => {

}

const main = async () => {
    console.log('Start fetching data...');
    const url = `${STRAPI_URL}/api/list/markdown-content`
    const dataContent = await fetchAndProcessData(url);
    // console.log(dataContent)
    const environment = process.argv[2];
    const folderParent = process.argv[3];
    const isProduction = environment === 'production';
    const promiseList = dataContent.reduce((acc, value) => {
        const {folder, locale, localizations, content, description} = value;
        const contentSave = {
            content, description
        }
        const prefix = isProduction ? 'list-' : 'preview-';
        const fileName = `${prefix}${locale}.json`;
        if (localizations && localizations.length > 0) {
            for (const localization of localizations) {
                const {locale, content, description} = localization;
                const fileName = `${prefix}${locale}.json`;
                const contentSave = {
                    content, description
                }
                acc.push(createContentToFile(folderParent, folder, fileName, JSON.stringify(contentSave, null, 2)));
            }
        }
        acc.push(createContentToFile(folderParent, folder, fileName, JSON.stringify(contentSave, null, 2)));
        return acc;
    }, [])
    await Promise.all(promiseList);
}

main().catch((error) => console.error(error));
