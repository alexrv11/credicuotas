import PropTypes from 'prop-types';
import MuiTypography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const LoanDetails = () => {
    const { id } = useParams();
    return (
        <MainCard title={`Prestamo: ${id}`}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <MuiTypography variant="h6" gutterBottom>
                        it is coming
                    </MuiTypography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LoanDetails;
