// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import MuiTypography from '@mui/material/Typography';
import { useQuery } from '@apollo/client';
import GET_CLIENTS from 'api/gql/queries/get-clients';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Loader from 'ui-component/Loader';

const ClientProfiles = () => {
    const [pageSize, setPageSize] = useState(25);
    const { loading, error, data } = useQuery(GET_CLIENTS);
    const columns = [
        {
            field: 'id',
            hide: true
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 220,
            editable: false
        },
        {
            field: 'email',
            headerName: 'Correo electrónico',
            width: 320,
            editable: false
        },
        {
            field: 'phone',
            headerName: 'Teléfono',
            width: 180,
            editable: false
        },
        {
            field: 'identifierNumber',
            headerName: 'Documento de identidad',
            width: 250,
            editable: false
        }
    ];

    if (loading || error || !data) {
        return (
            <MainCard title="Solicitudes de Préstamos">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                        <MuiTypography variant="h6" gutterBottom>
                            Solicitudes de Préstamos
                        </MuiTypography>
                        <Loader />
                    </Grid>
                </Grid>
            </MainCard>
        );
    }

    return (
        <MainCard title="Clientes">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data?.getClients}
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

export default ClientProfiles;
