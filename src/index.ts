import path from 'path';

import { FNode } from './utils/FNode';
import { FS } from './utils/FS';

type TravelAction = (node: FNode, layer: number) => void;

export class FTree {

    private rootDir: string;
    private root: FNode;

    /**
     * creates a new File Tree Object
     * @param {string} rootDir - path to the root directory of the created tree
     */
    constructor(rootDir: string) {
        this.rootDir = rootDir;
        this.root = new FNode(rootDir, null);

        this.update();
    }

    /**
     * gets the root directory of the file tree
     * @returns {FNode} - root directory node
     */
    getRoot = (): FNode => this.root;

    /**
     * gets the path of the root directory of the file tree
     * @returns {string} - path of root directory
     */
    getRootDir = (): string => this.rootDir;

    /**
     * prints the file tree using depth first recursion
     * @returns {void}
     */
    printTree = () => this.travel((node, layer) => console.log(`F:|${this.getHyphens(layer * 2)}> ${node.getName()}`), (node, layer) => console.log(`D:|${this.getHyphens(layer * 2)}> ${node.getName()}`));

    private getHyphens = (num: number): string => {
        let rt: string = '';

        for (let i = 0; i < num; ++i)
            rt += '-';

        return rt;
    }

    /**
     * Depth first recursion to travel the file tree
     * Allows custom actions when file and directories are reached
     * @param onFile - callback function when a file is reached during recursion
     * @param onDir  - callback function when a directory is reacehd during recursion
     * @returns {void}
     */
    travel = (onFile: TravelAction, onDir: TravelAction) => this.travelRecur(this.root, onFile, onDir);

    private travelRecur = (root: FNode, onFile: TravelAction, onDir: TravelAction, layer = 0) => {
        root.getDirs().forEach(node => {
            onDir(node, layer);
            this.travelRecur(node, onFile, onDir, layer + 1);
        });

        root.getFiles().forEach(node => onFile(node, layer));
    }

    /**
     * Crawls through the file tree again and update the nodes to match the file system
     * @returns {void}
     */
    update = () => {
        this.root.clearChildren();
        this.updateRecur(this.root);
    }

    private updateRecur = (parent: FNode): void => {
        let pPath = parent.getPath();
        FS.getFiles(pPath)
            .map(name => new FNode(path.join(pPath, name), parent))
            .forEach(node => parent.addFiles(node));

        FS.getDirs(pPath)
            .map(name => new FNode(path.join(pPath, name), parent))
            .forEach(node => {
                parent.addDirs(node);
                this.updateRecur(node);
            });
    }
}
