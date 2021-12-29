import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const LoanOrders = () => (
    <MainCard title="Solicitudes de Prestamos">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
                <MuiTypography variant="h6" gutterBottom>
                    it is coming
                </MuiTypography>
            </Grid>
        </Grid>
    </MainCard>
);

export default LoanOrders;
