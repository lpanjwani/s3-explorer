'use client';
import { explorerStyles, styles } from '@/common/styles/explorer/explorer-styles.builder';
import { FileList } from '@/common/types/file.d';
import { createFileTree } from '@/common/utils/createFileTree';
import {
	FileTreeNode,
	Node,
	isDir,
	useObserver,
	useSelections,
	useTraits,
	useVirtualize
} from 'exploration';
import React, { useCallback, useMemo } from 'react';
import { VscFile, VscFolder } from 'react-icons/vsc';

interface FileBrowserProps {
	list: FileList;
	onClick: (node: FileTreeNode<{}>) => void;
}

export default function FileBrowser({ list, onClick }: FileBrowserProps) {
	const windowRef = React.useRef<HTMLDivElement | null>(null);

	const tree = useMemo(() => createFileTree(list), [list]);
	const selections = useSelections(tree);
	const traits = useTraits(tree, ['selected', 'focused']);
	const virtualize = useVirtualize(tree, { windowRef, nodeHeight: 24 });

	useObserver(selections.didChange, value => {
		const selected: number[] = [...value];

		const node = tree.getById(selected[0]);

		if (node) {
			onClick(node);
		}
	});

	const plugins = useMemo(() => [traits, selections], [traits, selections]);

	const renderNodes = useCallback(() => {
		return virtualize.map(props => {
			return (
				<Node plugins={plugins} {...props} key={props.key}>
					{isDir(props.node) ? <VscFolder /> : <VscFile />}
					<span>{props.node.basename}</span>
				</Node>
			);
		});
	}, [virtualize, plugins]);

	return (
		<main className={styles.theme('dark')}>
			<div ref={windowRef} className={explorerStyles()}>
				<div {...virtualize.props}>{renderNodes()}</div>
			</div>
		</main>
	);
}
