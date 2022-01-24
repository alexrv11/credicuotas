import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography, Grid, Button, Box, Chip } from '@mui/material';
import styled from '@emotion/styled';

const ValidateTextWrapper = styled.span(({ theme }) => ({
    color: theme.palette.secondary.dark,
    textDecorationLine: 'underline'
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

export default function LoanTabs({ loan }) {
    const [value, setValue] = React.useState(0);

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
                <Typography variant="h6" gutterBottom component="div">
                    {doc.description}
                </Typography>
                <Chip label={doc.statusDescription} variant="outlined" />
                <Button>
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
