import fs from 'fs';
import path from 'path';

const getWidgets = () => {
    const resolvedPath = path.resolve('src/main/widgets');
    let fileContents: Record<string, unknown> = {};

    const readFilesRecursively = (dir: string) => {
        const files: string[] = fs.readdirSync(dir);

        files.forEach((filename: string): void => {
            const filePath: string = path.join(dir, filename);
            const fileStat: fs.Stats = fs.statSync(filePath);

            if (fileStat.isDirectory()) {
                readFilesRecursively(filePath);
            } else {
                const extension = path.extname(filename);

                if (extension === '.html') {
                    const key: string = filename.split('.').shift();

                    Object.defineProperty(fileContents, key, {
                        get() {
                            return fs.readFileSync(filePath);
                        },
                    });
                }
            }
        });

        return fileContents;
    };

    return readFilesRecursively(resolvedPath);
};

export {
    getWidgets,
};
