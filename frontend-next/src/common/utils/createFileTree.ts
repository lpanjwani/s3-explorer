'use client';
import { ItemType } from '@/common/enums/item-type.enum';
import { createFileTree as createFileTreeUtil } from 'exploration';

const createFileTree = (data: any) => {
	return createFileTreeUtil((parent, { createFile, createDir }) => {
		if (!data?.[parent?.data?.name]) return [];

		return data[parent.data.name].map((stat: { name: string; type: ItemType }) => {
			if (stat.type === ItemType.FILE) {
				return createFile({ name: stat.name });
			}

			return createDir({ name: stat.name });
		});
	});
};

export { createFileTree };
