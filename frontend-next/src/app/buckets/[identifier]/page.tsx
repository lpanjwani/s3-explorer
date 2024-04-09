'use client';
import React, { useMemo, useState } from 'react';

import { useListObjectsQuery } from '@/common/api/index/S3ControllerQuery';
import FileBrowser from '@/common/components/file-browser';
import { ItemType } from '@/common/enums/item-type.enum';
import useBaseUrl from '@/common/hooks/use-base-url';
import { FileTreeNode, isFile } from 'exploration';
import { FileInfo } from '@/common/types/file';
import ModelComponent from '@/common/components/model';

interface ObjectBrowserProps {
	params: { identifier: string };
}

export default function ObjectBrowser({ params }: ObjectBrowserProps) {
	const [modelInfo, setModelInfo] = useState<any>();

	const { identifier: bucketName } = params;

	useBaseUrl();

	const { data: objectsApiData } = useListObjectsQuery({
		bucketName
	});

	const parsedObjects = useMemo(() => {
		if (!objectsApiData || objectsApiData.length < 1) {
			return {
				'/': []
			};
		}

		const fileStoreMap: Record<string, FileInfo[]> = {};

		const populateFileInStore = (dirKey: string, fileKey: string) => {
			if (!fileStoreMap[dirKey]) {
				fileStoreMap[dirKey] = [];
			}

			fileStoreMap[dirKey].push({
				name: fileKey,
				type: ItemType.FILE
			});
		};

		const populateDirInStore = (dirArr: string[]) => {
			dirArr.map((_, idx) => {
				let dirKey = dirArr.slice(0, idx).join('/');

				if (dirKey === '') {
					dirKey = '/';
				}

				if (!fileStoreMap[dirKey]) {
					fileStoreMap[dirKey] = [];
				}

				const isDirExists = fileStoreMap[dirKey].find(
					item => item.name === dirArr.slice(0, idx + 1).join('/')
				);

				if (!isDirExists) {
					fileStoreMap[dirKey].push({
						name: dirArr.slice(0, idx + 1).join('/'),
						type: ItemType.DIRECTORY
					});
				}
			});
		};

		objectsApiData.map(bucket => {
			const fileDirectoryArr: string[] = bucket.Key.split('/').slice(0, -1);

			populateDirInStore(fileDirectoryArr);

			populateFileInStore(fileDirectoryArr.join('/'), bucket.Key);
		});

		return fileStoreMap;
	}, [objectsApiData]);

	const findInfoByKey = (key: string) => {
		return objectsApiData?.find(item => item.Key === key);
	};

	const onClick = (node: FileTreeNode<{}>) => {
		if (isFile(node)) {
			const fileInfo = findInfoByKey(node.data.name);
			setModelInfo({ ...fileInfo, id: fileInfo?.Key });
		}
	};

	const renderModel = () => {
		if (!modelInfo) return <></>;

		return (
			<ModelComponent
				open={!!modelInfo}
				handleClose={() => setModelInfo(false)}
				rows={[modelInfo]}
				columns={[
					{ field: 'Key', headerName: 'Key', width: 200 },
					{ field: 'Size', headerName: 'Size', width: 200 },
					{ field: 'LastModified', headerName: 'Last Modified', width: 200 }
				]}
				onDownloadClick={() => {
					const url = `http://localhost:3000/buckets/${bucketName}/objects/download?objectKey=${modelInfo.Key}`;
					window.open(url, '_blank');
				}}
			/>
		);
	};

	const renderFileBrowser = () => {
		return <FileBrowser list={parsedObjects} onClick={onClick} />;
	};

	return (
		<>
			{renderFileBrowser()}
			{renderModel()}
		</>
	);
}
