'use client';
import React, { useMemo } from 'react';

import { useListBucketsQuery } from '@/common/api/index/S3ControllerQuery';
import FileBrowser from '@/common/components/file-browser';
import { ItemType } from '@/common/enums/item-type.enum';
import useBaseUrl from '@/common/hooks/use-base-url';
import { FileTreeNode } from 'exploration';
import { useRouter } from 'next/navigation';

export default function BucketBrowser() {
	const router = useRouter();

	useBaseUrl();

	const { data: bucketsApiData } = useListBucketsQuery({});

	const parsedBuckets = useMemo(() => {
		if (!bucketsApiData || bucketsApiData.length < 1)
			return {
				'/': []
			};

		const mappedArray = bucketsApiData.map(bucket => {
			return {
				name: bucket.Name,
				type: ItemType.DIRECTORY
			};
		});

		return { '/': mappedArray };
	}, [bucketsApiData]);

	const onClick = (node: FileTreeNode<{}>) => {
		router.push(`/buckets/${node.data.name}`);
	};

	return <FileBrowser list={parsedBuckets} onClick={onClick} />;
}
