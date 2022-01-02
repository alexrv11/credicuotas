import MuiTypography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';

// material-ui
import { Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import LoanTimeline from 'ui-component/timeline';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import VerticalLinearStepper from 'ui-component/stepper';
import LoanTabs from 'ui-component/loantabs';

const DetailWrapper = styled.div(({ theme }) => ({
    padding: 20,
    color: theme.palette.secondary.dark
}));

const TitleWrapper = styled.p(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontSize: 20,
    fontWeight: 'bold'
}));

const ValueWrapper = styled.span(({ theme }) => ({
    color: theme.palette.secondary.dark,
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
}));

const LoanDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid container>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Prestamo a
                            </Typography>
                            <Typography variant="h3" gutterBottom component="div">
                                Nombre Cliente
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Estado
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                Registrado
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Monto
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                bs. 12.000
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Duracion
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                12 semanas
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Interes
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                12%
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                </Grid>
                <Divider flexItem width="100%" />
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <LoanTabs />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <VerticalLinearStepper />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LoanDetails;
