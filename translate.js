import { translate } from 'bing-translate-api';

/**
 * 
 * @param {*} text 
 * @returns translated text to English
 */
async function toEnglish(text) {
    try {
        const res = await translate(text, null, 'en');
        const tranlated = res.translation;
        return tranlated;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 
 * @param {*} text 
 * @returns translated text to Indonesia
 */
async function toIndonesia(text) {
    try {
        const res = await translate(text, null, 'id');
        const tranlated = res.translation;
        return tranlated;
    } catch (err) {
        console.error(err);
    }
}

export { toEnglish, toIndonesia };

