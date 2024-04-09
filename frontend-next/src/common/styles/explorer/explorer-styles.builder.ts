import reset from '@dash-ui/reset';
import { createStyles } from '@dash-ui/styles';
import * as colors from '@radix-ui/colors';

const styles = createStyles({
	themes: {
		dark: {
			colors: {
				...colors,
				textColor: colors.slate.slate2,
				bgColor: colors.slate.slate12,

				selected: {
					textColor: colors.blue.blue9
				},

				focused: {
					bgColor: colors.blackA.blackA10,
					borderColor: colors.blue.blue9
				},

				dropTarget: {
					bgColor: colors.whiteA.whiteA5
				}
			}
		}
	}
});

const explorerStyles = styles.one(t => ({
	background: t.colors.bgColor,
	color: t.colors.textColor,
	height: '100vh',
	width: '100%',
	overflow: 'auto',

	...[...Array(20).keys()].reduce((acc, depth) => {
		acc[`[data-exploration-depth="${depth}"]`] = {
			display: 'flex',
			gap: '0.3333em',
			alignItems: 'center',
			width: '100%',
			paddingLeft: `${depth}rem`,
			borderStyle: 'solid',
			borderWidth: 1,
			borderColor: 'transparent',
			'*:last-child': {
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap'
			}
		};

		return acc;
	}, {} as Style),

	svg: {
		opacity: 0.5
	},

	'[data-exploration-type="dir"] svg': {
		opacity: 1,
		color: t.colors.amberDark.amber9
	},

	'.selected': {
		color: t.colors.selected.textColor
	},

	'.focused': {
		borderColor: t.colors.focused.borderColor,
		backgroundColor: t.colors.focused.bgColor,
		outline: 'none'
	}
}));

styles.insertGlobal(reset);

type Style = { [key: string]: React.CSSProperties | Style };

export { styles, explorerStyles };
export type { Style };
