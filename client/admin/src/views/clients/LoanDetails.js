import MuiTypography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';

// material-ui
import { Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import styled from '@emotion/styled';
import { useState } from 'react';
import VerticalLinearStepper from 'ui-component/stepper';
import LoanTabs from 'ui-component/loantabs';
import { useQuery } from '@apollo/client';
import GET_LOAN from 'api/gql/queries/get-loan';
import Loader from 'ui-component/Loader';

const DetailWrapper = styled.div(({ theme }) => ({
    padding: 20,
    color: theme.palette.secondary.dark
}));

const LoanDetails = () => {
    const { id } = useParams();
    const { data, error, loading } = useQuery(GET_LOAN, { variables: { id }, pollInterval: 500 });
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (loading) {
        return <Loader />;
    }

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
                                {data?.getLoanById?.ownerName}
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Estado
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                {data?.getLoanById?.statusDescription}
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Monto
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                bs. {data?.getLoanById?.amount}
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Duracion
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                {data?.getLoanById?.totalInstallments} semanas
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                    <Grid item lg={3} md={2} sm={2} xs={12}>
                        <DetailWrapper>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Interes
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                {data?.getLoanById?.ratePercentage}
                            </Typography>
                        </DetailWrapper>
                    </Grid>
                </Grid>
                <Divider flexItem width="100%" />
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <LoanTabs loan={data?.getLoanById} />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <VerticalLinearStepper timeline={data?.getLoanById?.timeline} loan={data?.getLoanById} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LoanDetails;
