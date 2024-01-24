import fs from "fs";
import path from "path";

const readFilesRecursively = (dir: string): { [key: string]: string } => {
    const files = fs.readdirSync(dir);
    const includes: { [key: string]: string } = {};

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            readFilesRecursively(filePath);
        } else {
            const extension = path.extname(file);

            if (extension === '.html') {
                const relativePath = path.relative(dir, filePath);
                const filename = path.basename(relativePath, path.extname(relativePath));

                includes[filename] = fs.readFileSync(filePath, 'utf8');
            }
        }
    });

    return includes;
};

export {
    readFilesRecursively,
};
