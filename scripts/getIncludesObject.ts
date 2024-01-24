import fs from 'fs';
import path from 'path';
import { TemplateStringType } from "../config/build/plugins/buildPagesList";

function getIncludesObject(directoryPath: string): TemplateStringType {
    const resolvedPath = path.resolve(__dirname, directoryPath);

    const includes: { [key: string]: string } = {};

    function readFilesRecursively(dir: string) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const fileStat = fs.statSync(filePath);

            if (fileStat.isDirectory()) {
                readFilesRecursively(filePath);
            } else {
                const extension = path.extname(file);

                if (extension === '.html') {
                    const relativePath = path.relative(resolvedPath, filePath);
                    const filename = path.basename(relativePath, path.extname(relativePath));
                    includes[filename] = fs.readFileSync(filePath, 'utf8');
                }
            }
        });
    }

    readFilesRecursively(resolvedPath);

    return includes;
}

export default getIncludesObject;
