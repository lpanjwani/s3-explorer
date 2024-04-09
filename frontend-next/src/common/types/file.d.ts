import { ItemType } from '@/common/enums/item-type.enum';

export type FileInfo = { name: string; type: ItemType };

export type FileList = Record<string, FileItem[]>;
