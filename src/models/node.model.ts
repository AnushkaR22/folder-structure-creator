export class NodeModel {
    id!: string;
    type!: 'folder' | 'file' | 'unset' | null;
    name?: string;
    children?: NodeModel[];
}