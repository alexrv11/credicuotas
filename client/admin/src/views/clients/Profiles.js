// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import MuiTypography from '@mui/material/Typography';

const ClientProfiles = () => (
    <MainCard title="Clientes" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MuiTypography variant="h6" gutterBottom>
                    it is coming
                </MuiTypography>
            </Grid>
        </Grid>
    </MainCard>
);

export default ClientProfiles;
