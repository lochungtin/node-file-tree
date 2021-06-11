import { FS } from "./FS";

export class FNode {

    private name: string;
    private path: string;

    private parent: FNode | null;
    
    private dirs: Array<FNode> = [];
    private files: Array<FNode> = [];

    constructor(path: string, parent: FNode | null) {
        this.name = FS.getNameFromPath(path);
        this.path = path;

        this.parent = parent;
    }
    
    addDirs = (child: FNode) => this.dirs.push(child);

    addFiles = (child: FNode) => this.files.push(child);

    getDirs = (): Array<FNode> => this.dirs;

    getFiles = (): Array<FNode> => this.files;

    getName = (): string => this.name;

    getParent = (): FNode | null => this.parent;

    getPath = (): string => this.path;
}