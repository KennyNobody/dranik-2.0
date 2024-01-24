import fs from 'fs';
import path from 'path';
import { TemplatePageType } from "../config/build/plugins/buildPagesList";

function getIncludesObject(directoryPath: string): TemplatePageType[] {
    const resolvedPath = path.resolve(__dirname, directoryPath);
    const includes: TemplatePageType[] = [];

    function readFilesRecursively(dir: string, basePath: string) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const fileStat = fs.statSync(filePath);

            if (fileStat.isDirectory()) {
                readFilesRecursively(filePath, basePath);
            } else {
                const extension = path.extname(file);

                if (extension === '.html') {
                    const relativePath = path.relative(basePath, filePath);

                    includes.push({
                        name: file,
                        path: `${relativePath.replace(/\\/g, '/')}`,
                    });
                }
            }
        });
    }

    readFilesRecursively(resolvedPath, resolvedPath);

    return includes;
}

export default getIncludesObject;
