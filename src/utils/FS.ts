import fs from 'fs';
import path from 'path';

type FilterCallBack = (name: string) => boolean;

export class FS {

    static getDirs = (dir: string, includeHidden = false, filter: FilterCallBack = (name: string) => true): Array<string> => fs
        .readdirSync(dir)
        .filter(name => (
            (includeHidden || name.startsWith('.')) &&
            fs.statSync(path.join(dir, name)).isDirectory() &&
            filter
        ));

    static getFiles = (dir: string, includeHidden = false, filter: FilterCallBack = (name: string) => true): Array<string> => fs
        .readdirSync(dir)
        .filter(name => (
            (includeHidden || name.startsWith('.')) &&
            fs.statSync(path.join(dir, name)).isFile() &&
            filter
        ));

    static getNameFromPath = (pathname: string): string => 
        pathname.substring(pathname.lastIndexOf(path.sep) + 1);
}