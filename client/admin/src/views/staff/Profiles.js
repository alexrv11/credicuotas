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
import GET_STAFF from 'api/gql/queries/get-staff';
import CREATE_USER from 'api/gql/mutations/create-user';
import { useNavigate } from 'react-router';

const StaffProfiles = () => {
    const [pageSize, setPageSize] = useState(25);
    const { loading, error, data } = useQuery(GET_STAFF);
    const [createUser] = useMutation(CREATE_USER);
    const navigate = useNavigate();

    const columns = [
        {
            field: 'id',
            hide: true
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 220,
            editable: false
        },
        {
            field: 'email',
            headerName: 'Correo electrónico',
            width: 320,
            editable: false
        },
        {
            field: 'role',
            headerName: 'Rol',
            width: 180,
            editable: false
        }
    ];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEmail('');
        setName('');
        setEmailError(false);
        setEmailErrorMsg('');
        setNameError(false);
        setNameErrorMsg('');
        setOpen(false);
    };

    const [userRol, setUserRol] = useState('CREDIT_ASSISTANT');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = useCallback(async () => {
        try {
            await createUser({ variables: { name, email, role: userRol, password: 'Control123' }, refetchQueries: [GET_STAFF] });
            setOpen(false);
        } catch (e) {
            setEmailError(true);
            setEmailErrorMsg('el email ya fue registrado');
        }
    }, [createUser, email, name, userRol]);

    const handleChange = (event) => {
        setUserRol(event.target.value);
    };

    if (loading || error || !data) {
        return (
            <MainCard title="Personal">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                        <MuiTypography variant="h6" gutterBottom>
                            Solicitudes de Préstamos
                        </MuiTypography>
                        <Loader />
                    </Grid>
                </Grid>
            </MainCard>
        );
    }

    return (
        <MainCard
            title="Personal"
            secondary={
                <Tooltip title="Registrar nuevo usuario" placement="left">
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
                        <DialogContentText>Para el registro de un usuario adminimistrativo ingrese:</DialogContentText>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={name}
                                helperText={nameErrorMsg}
                                error={nameError}
                                onChange={(e) => {
                                    const pattern = /^[ñíóáéú a-zA-Z 0-9]+$/g;
                                    setName(e.target.value);
                                    const result = pattern.test(e.target.value);
                                    if (!result) {
                                        setNameError(true);
                                        setNameErrorMsg('El nombre tiene caracteres invalidos');
                                        return;
                                    }
                                    setNameError(false);
                                    setNameErrorMsg('');
                                }}
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                margin="dense"
                                id="user-email"
                                label="Correo Electrónico"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={email}
                                helperText={emailErrorMsg}
                                error={emailError}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
                                    const result = pattern.test(e.target.value);
                                    if (!result) {
                                        setEmailError(true);
                                        setEmailErrorMsg('el email es invalido');
                                    } else {
                                        setEmailError(false);
                                        setEmailErrorMsg('');
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <FormControl sx={{ m: 1, minWidth: 180 }}>
                                <InputLabel id="create-user-select-role-label">Rol del usuario</InputLabel>
                                <Select
                                    labelId="create-user-select-role-label"
                                    id="select-role-values"
                                    value={userRol}
                                    label="Rol del usuario"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="CREDIT_ASSISTANT">Asesor de Crédito</MenuItem>
                                    <MenuItem value="MANAGER">Gerente</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button disabled={emailError || nameError} onClick={handleSubmit}>
                            Registrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data?.getStaff}
                            columns={columns}
                            pageSize={pageSize}
                            onRowClick={(data) => navigate(`/admin/staff/profiles/${data.id}`)}
                            onPageSizeChange={(newPage) => setPageSize(newPage)}
                            pagination
                        />
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default StaffProfiles;
