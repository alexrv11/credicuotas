import MuiTypography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';

// material-ui
import { Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import LoanTimeline from 'ui-component/timeline';
import styled from '@emotion/styled';
import { fontWeight } from '@mui/system';

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
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid container spacing={gridSpacing} rowSpacing={2}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <DetailWrapper>
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
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <LoanTimeline />
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <MuiTypography variant="h6" gutterBottom>
                        It is coming
                    </MuiTypography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LoanDetails;
