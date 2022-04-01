// material-ui
import { Grid, Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import MuiTypography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useMutation, useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useCallback } from 'react';
import Loader from 'ui-component/Loader';
import GET_LOAN_TYPES from 'api/gql/queries/get-loan-types';
import CREATE_LOAN_TYPE from 'api/gql/mutations/create-loan-type';

const LoanTypes = () => {
    const [pageSize, setPageSize] = useState(25);
    const { loading, error, data } = useQuery(GET_LOAN_TYPES);
    const [createLoanType] = useMutation(CREATE_LOAN_TYPE);

    const columns = [
        {
            field: 'id',
            hide: true
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 280,
            editable: false
        },
        {
            field: 'rate',
            headerName: 'Interes',
            width: 80,
            editable: false
        },
        {
            field: 'minAmount',
            headerName: 'Monto min',
            width: 120,
            editable: false
        },
        {
            field: 'maxAmount',
            headerName: 'Monto max',
            width: 120,
            editable: false
        }
    ];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState('');
    const [rate, setRate] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    const handleSubmit = useCallback(async () => {
        await createLoanType({ variables: { name, rate, minAmount, maxAmount }, refetchQueries: [GET_LOAN_TYPES] });
        setOpen(false);
    }, [createLoanType, maxAmount, minAmount, name, rate]);

    if (loading || error || !data) {
        return (
            <MainCard title="Cargando">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                        <MuiTypography variant="h6" gutterBottom>
                            Tipos de Prestamo
                        </MuiTypography>
                        <Loader />
                    </Grid>
                </Grid>
            </MainCard>
        );
    }

    return (
        <MainCard
            title="Tipos de Prestamos"
            secondary={
                <Tooltip title="Registrar nuevo tipo de prestamo" placement="left">
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </Tooltip>
            }
        >
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Nuevo usuario</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Para el registro de un nuevo tipo de prestamo ingrese:</DialogContentText>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                margin="dense"
                                id="loan-name"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                margin="dense"
                                id="rate"
                                label="Interes"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                margin="dense"
                                id="minAmount"
                                label="Monto min"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={minAmount}
                                onChange={(e) => setMinAmount(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                margin="dense"
                                id="maxAmount"
                                label="Monto max"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={maxAmount}
                                onChange={(e) => setMaxAmount(e.target.value)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSubmit}>Registrar</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data?.getLoanTypes}
                            columns={columns}
                            pageSize={pageSize}
                            onRowClick={(client) => console.log('click row client', client)}
                            onPageSizeChange={(newPage) => setPageSize(newPage)}
                            pagination
                        />
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LoanTypes;
