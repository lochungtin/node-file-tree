import { FS } from "./FS";

export class FNode {

    private name: string;
    private path: string;

    private parent: FNode | null;

    private dirs: Array<FNode> = [];
    private files: Array<FNode> = [];

    /**
     * creates a new FNode for the FTree class
     * @param {string} path         - path of current node
     * @param {Fnode | null} parent - parent node 
     */
    constructor(path: string, parent: FNode | null) {
        this.name = FS.getNameFromPath(path);
        this.path = path;

        this.parent = parent;
    }

    /**
     * add a FNode as a child (directory) of the current FNode
     * @param {FNode} child - directory to be added
     * @returns {void}
     */
    addDirs = (child: FNode) => this.dirs.push(child);

    /**
     * add a FNode as a child (file) of the current FNode
     * @param {FNode} child - file to be added
     * @returns {void}
     */
    addFiles = (child: FNode) => this.files.push(child);

    /**
     * clears the childrens of the current node
     * @returns {void}
     */
    clearChildren = () => {
        this.dirs = [];
        this.files = [];
    }

    /**
     * returns the directories inside current node
     * @returns {Array<FNode>} - array of directory nodes
     */
    getDirs = (): Array<FNode> => this.dirs;

    /**
     * returns the files inside the current node
     * @returns {Array<FNode>} - array of file nodes
     */
    getFiles = (): Array<FNode> => this.files;

    /**
     * returns the name of the current node
     * @returns {string} - name of the node
     */
    getName = (): string => this.name;

    /**
     * returns the parent of the current node
     * @returns {FNode} - parent of the node
     */
    getParent = (): FNode | null => this.parent;

    /**
     * returns the path of the current node
     * @returns {string} - path of the node
     */
    getPath = (): string => this.path;
}