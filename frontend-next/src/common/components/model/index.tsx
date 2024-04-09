import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ModelComponentProps {
	open: boolean;
	handleClose: () => void;
	rows: any[];
	columns: GridColDef[];
	onDownloadClick: () => void;
}

export default function ModelComponent({
	open,
	handleClose,
	rows,
	columns,
	onDownloadClick
}: ModelComponentProps) {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			sx={{
				backgroundColor: 'rgba(255, 255, 255, 1)'
			}}
			hideBackdrop
		>
			<>
				<DataGrid
					rows={rows}
					columns={columns}
					sx={{
						height: '85vh',
						width: '100vw',
						marginLeft: 'auto',
						marginRight: 'auto'
					}}
				/>

				<Box
					sx={{
						display: 'flex',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '2rem',
						justifyContent: 'center'
					}}
				>
					<Button variant="outlined" onClick={onDownloadClick}>
						Download
					</Button>

					<Button
						variant="outlined"
						onClick={handleClose}
						sx={{
							marginLeft: '1rem'
						}}
					>
						Close
					</Button>
				</Box>
			</>
		</Modal>
	);
}
