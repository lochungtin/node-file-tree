import path from 'path';

import { FNode } from './utils/FNode';
import { FS } from './utils/FS';

type TravelAction = (node: FNode, layer: number) => void;

export class FTree {

    private rootDir: string;
    private root: FNode;

    constructor(rootDir: string) {
        this.rootDir = rootDir;
        this.root = new FNode(rootDir, null);

        this.update();
    }

    getRoot = (): FNode => this.root;

    getRootDir = (): string => this.rootDir;

    printTree = () => this.travel((node, layer) => console.log(`F:|${this.getHyphens(layer * 2)}> ${node.getName()}`), (node, layer) => console.log(`D:|${this.getHyphens(layer * 2)}> ${node.getName()}`));

    private getHyphens = (num: number): string => {
        let rt: string = '';

        for (let i = 0; i < num; ++i)
            rt += '-';

        return rt;
    }

    travel = (onFile: TravelAction, onDir: TravelAction) => this.travelRecur(this.root, onFile, onDir);

    private travelRecur = (root: FNode, onFile: TravelAction, onDir: TravelAction, layer = 0) => {
        root.getDirs().forEach(node => {
            onDir(node, layer);
            this.travelRecur(node, onFile, onDir, layer + 1);
        });

        root.getFiles().forEach(node => onFile(node, layer));
    }

    update = () => this.updateRecur(this.root);

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
