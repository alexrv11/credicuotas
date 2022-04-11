import { useParams } from 'react-router-dom';

// material-ui
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import styled from '@emotion/styled';
import VerticalLinearStepper from 'ui-component/stepper';
import LoanTabs from 'ui-component/loantabs';
import { useMutation, useQuery } from '@apollo/client';
import GET_STAFF_ID from 'api/gql/queries/get-staff-id';
import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import DELETE_USER from 'api/gql/mutations/delete-user';
import { useNavigate } from 'react-router';
import UPDATE_USER from 'api/gql/mutations/update-user';

const DetailWrapper = styled.div(({ theme }) => ({
    padding: 20,
    color: theme.palette.secondary.dark
}));

const StaffDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_STAFF_ID, { variables: { id } });
    const [name, setName] = useState('');
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [role, setRole] = useState('CREDIT_ASSISTANT');
    const [open, setOpen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [deleteUser] = useMutation(DELETE_USER, { variables: { id } });
    const [updateUser] = useMutation(UPDATE_USER);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (data?.getStaffById) {
            setName(data?.getStaffById?.name);
            setEmail(data?.getStaffById?.email);
            setRole(data?.getStaffById?.role);
            console.log('staff', data);
        }
    }, [setName, setEmail, data?.getStaffById?.name, data?.getStaffById?.email, data?.getStaffById?.role]);

    const handleChange = (event) => {
        console.log('role', event.target.value);
        setRole(event.target.value);
    };

    const handleSubmit = useCallback(async () => {
        //await createUser({ variables: { name, email, role: userRol, password: 'Control123' }, refetchQueries: [GET_STAFF] });
        await updateUser({ variables: { id, email, name, role } });
        setSnackbarMessage('Se guardo correctamente');
        setOpenMessage(true);
    }, [email, id, name, role, updateUser]);

    const handleDelete = useCallback(async () => {
        setOpen(true);
    }, [setOpen]);

    const handleClose = useCallback(async () => {
        //await createUser({ variables: { name, email, role: userRol, password: 'Control123' }, refetchQueries: [GET_STAFF] });
        setOpen(false);
    }, [setOpen]);

    const handleMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMessage(false);
    };

    const handleConfirmDelete = useCallback(async () => {
        //await createUser({ variables: { name, email, role: userRol, password: 'Control123' }, refetchQueries: [GET_STAFF] });

        console.log('confirm delete');
        try {
            await deleteUser();
            setSnackbarMessage('Se elimino la cuenta');
            navigate(`/admin/staff/profiles`);
        } catch (e) {
            console.log('delete error', e);
        }
        setOpen(false);
    }, [setOpen, deleteUser]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <MainCard>
            <Snackbar open={openMessage} autoHideDuration={4000} onClose={handleMessageClose}>
                <Alert onClose={handleMessageClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Esta seguro de eliminar esta cuenta</DialogTitle>
                    <DialogContent>
                        <Typography>
                            <Box sx={{ fontWeight: 500, m: 1 }}>{email}</Box>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleConfirmDelete}>Confirmar</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Grid container spacing={gridSpacing}>
                <Grid container>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <DetailWrapper>
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
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <DetailWrapper>
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
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={4} sm={4} xs={12}>
                        <DetailWrapper>
                            <FormControl sx={{ m: 1, minWidth: 180 }}>
                                <InputLabel id="create-user-select-role-label">Rol del usuario</InputLabel>
                                <Select
                                    labelId="create-user-select-role-label"
                                    id="select-role-values"
                                    value={role}
                                    label="Rol del usuario"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="CREDIT_ASSISTANT">Asesor de Crédito</MenuItem>
                                    <MenuItem value="MANAGER">Gerente</MenuItem>
                                </Select>
                            </FormControl>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <DetailWrapper>
                            <Button disabled={emailError || nameError} onClick={handleSubmit}>
                                Guardar
                            </Button>
                            <Button disabled={emailError || nameError} onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </DetailWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default StaffDetails;
