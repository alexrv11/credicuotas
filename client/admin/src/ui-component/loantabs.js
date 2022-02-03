import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
    Button,
    Box,
    Chip,
    CircularProgress,
    Paper,
    TextareaAutosize,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import styled from '@emotion/styled';

import axios from 'axios';
import CHANGE_DOCUMENT_STATUS from 'api/gql/mutations/change-document-status';
import { useMutation } from '@apollo/client';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ValidateTextWrapper = styled.span(({ theme }) => ({
    color: theme.palette.secondary.dark,
    textDecorationLine: 'underline'
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

function LoanTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

LoanTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const TitleWrapper = styled.div(({ theme }) => ({
    padding: 20,
    fontSize: 18
}));

export default function LoanTabs({ loan }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [selectedDoc, setSelectedDoc] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [note, setNote] = React.useState('');
    const [action, setAction] = React.useState('DECLINED');

    const [changeDocumentStatus, { loading }] = useMutation(CHANGE_DOCUMENT_STATUS);

    const handleClose = () => {
        setImage(null);
        setOpen(false);
    };

    useEffect(() => {
        setNote(selectedDoc?.note);
    }, [selectedDoc]);

    const handleChangeDocumentStatus = (doc, note, status) => {
        changeDocumentStatus({ variables: { documentId: doc.id, note, status } });
        setImage(null);
        setOpen(false);
    };

    const downloadFile = React.useCallback(async (url) => {
        await axios.get(`http://localhost:8282/download/${url}`, { responseType: 'arraybuffer' }).then((res) => {
            const base64ImageString = Buffer.from(res.data, 'binary').toString('base64');
            setImage(base64ImageString);
        });
    }, []);

    const imageView = (image) => {
        if (!image) {
            return <CircularProgress />;
        }
        return <img src={`data:image/png;base64, ${image}`} alt="" />;
    };

    const verDocument = (doc) => {
        setSelectedDoc(doc);
        setOpen(true);
        downloadFile(doc.url);
    };

    const viewDocuments = (documents) =>
        documents.map((doc) => (
            <Grid
                container
                lg={12}
                md={12}
                sm={12}
                xs={12}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ color: 'white', backgroundColor: '#e3f2fd', marginTop: 5, padding: 10, borderRadius: 5 }}
            >
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="h6" gutterBottom component="div">
                        {doc.description}
                    </Typography>
                </Grid>
                <Chip label={doc.statusDescription} variant="outlined" />
                <Button onClick={() => verDocument(doc)}>
                    <ValidateTextWrapper>Ver</ValidateTextWrapper>
                </Button>
            </Grid>
        ));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="">
                    <Tab label={`Documentos (${loan?.documents?.length})`} {...a11yProps(0)} />
                    <Tab label="Garantes" {...a11yProps(1)} />
                </Tabs>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar sx={{ position: 'relative', bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.dark }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" color="inherit">
                                <TitleWrapper>{selectedDoc?.description}</TitleWrapper>
                            </Typography>
                            <Chip label={selectedDoc?.statusDescription} variant="outlined" sx={{ marginRight: 10 }} />
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={2} style={{ padding: 10 }}>
                        <Grid item lg={7} md={7} sm={12} xs={12}>
                            <Item>{imageView(image)}</Item>
                        </Grid>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                            <Item>
                                <FormControl>
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={5}
                                        placeholder="Nota"
                                        style={{ width: 320 }}
                                        value={note}
                                        onChange={(event) => setNote(event?.target?.value)}
                                    />
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        value={action}
                                        onChange={(event) => setAction(event?.target?.value)}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="DECLINED" control={<Radio />} label="Rechazar" />
                                        <FormControlLabel value="APPROVED" control={<Radio />} label="Aprobar" />
                                    </RadioGroup>
                                    {loan.status === 'RUNNING' ? null : (
                                        <Button variant="contained" onClick={() => handleChangeDocumentStatus(selectedDoc, note, action)}>
                                            Guardar
                                        </Button>
                                    )}
                                </FormControl>
                            </Item>
                        </Grid>
                    </Grid>
                </Dialog>
            </Box>
            <LoanTabPanel value={value} index={0}>
                {viewDocuments(loan?.documents)}
            </LoanTabPanel>
            <LoanTabPanel value={value} index={1}>
                {}
            </LoanTabPanel>
        </Box>
    );
}
