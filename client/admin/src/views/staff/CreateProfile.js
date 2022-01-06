// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import MuiTypography from '@mui/material/Typography';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Loader from 'ui-component/Loader';
import GET_STAFF from 'api/gql/queries/get-staff';

const StaffProfiles = () => {

    console.log('hello');
    return (
        <MainCard title="Personal">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data?.getStaff}
                            columns={columns}
                            pageSize={pageSize}
                            onRowClick={(client) => console.log('click row client', client)}
                            onPageSizeChange={(newPage) => setPageSize(newPage)}
                            pagination
                        />
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default StaffProfiles;
