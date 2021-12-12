// This file should exist in `src/common/helpers`
// import fs from 'fs';
const fs = require('fs');

import { promisify } from 'util';

/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export const checkIfFileOrDirectoryExists = async (path: string): Promise<boolean> => {

    console.log('-----------------------------------------------------p')
    console.log("path :>>", path)
    console.log('-----------------------------------------------------p')
    const direxists = await fs.existsSync(path)

    return await direxists;
};

/**
 * check if folder exists, if not create it
 * 
 * @param {string} dir_name
 * @param encoding 
 * @returns 
 */
export const createDirAsync = async (dir_name: string) => {
    const direxists = await fs.existsSync(dir_name)

    console.log('-----------------------------------------------------p')
    console.log("direxists :>>", direxists)
    console.log('-----------------------------------------------------p')

    if (!direxists) {
        const dir_created = fs.mkdirSync(dir_name, { recursive: true });

        console.log('-----------------------------------------------------p')
        console.log("dir_created :>>", dir_created)
        console.log('-----------------------------------------------------p')

    }
    console.log("dir created");

}
/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} encoding
 *
 * @returns {Promise<Buffer>}
 */
export const getFile = async (
    path: string,
    encoding: string,
): Promise<string | Buffer> => {
    const readFile = promisify(fs.readFile);
    // let encodings 
    return encoding ? readFile(path) : readFile(path, {});
};

/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createFile = async (
    path: string,
    fileName: string,
    data: string,
): Promise<void> => {
    console.log(`creating file`);
    const writeFile = promisify(fs.writeFile);
    return await writeFile(`${path}/${fileName}`, data, 'utf8');
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const deleteFile = async (path: string): Promise<void> => {
    const unlink = promisify(fs.unlink);

    return await unlink(path);
};