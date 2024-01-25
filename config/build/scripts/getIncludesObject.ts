import fs from 'fs';
import path from 'path';
import { TemplateStringType } from "./buildPagesList";

function getIncludesObject(directoryPath: string): TemplateStringType {
    const resolvedPath = path.resolve(__dirname, directoryPath);

    const includes: { [key: string]: Buffer } = {};

    function readFilesRecursively(dir: string) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const fileStat = fs.statSync(filePath);

            if (fileStat.isDirectory()) {
                readFilesRecursively(filePath);
            } else {
                const extension = path.extname(file);

                if (extension === '.html' && file !=='index.html') {
                    const relativePath = path.relative(directoryPath, filePath);
                    const filename = path.parse(file).name;

                    includes[filename] = fs.readFileSync(path.resolve('src', 'main', 'widgets', relativePath));
                }
            }
        });
    }

    readFilesRecursively(resolvedPath);

    return includes;
}

export default getIncludesObject;
