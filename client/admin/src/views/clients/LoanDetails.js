import PropTypes from 'prop-types';
import MuiTypography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import LoanTimeline from 'ui-component/timeline';

const LoanDetails = () => {
    const { id } = useParams();
    return (
        <MainCard title={`Prestamo: ${id}`}>
            <Grid container spacing={gridSpacing}>
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
