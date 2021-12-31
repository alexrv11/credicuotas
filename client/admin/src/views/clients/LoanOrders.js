import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import { useQuery } from '@apollo/client';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';
import GET_LOAN_ORDERS from 'api/gql/queries/get-loan-orders';

const LoanOrders = () => {
    const [pageSize, setPageSize] = useState(25);
    const { loading, error, data } = useQuery(GET_LOAN_ORDERS);
    const columns = [
        {
            field: 'id',
            hide: true
        },
        {
            field: 'incomeType',
            headerName: 'Tipo de Ingreso',
            width: 220,
            editable: false
        },
        {
            field: 'amount',
            headerName: 'Monto',
            width: 120,
            editable: false
        },
        {
            field: 'totalInstallments',
            headerName: 'Cuotas',
            width: 80,
            editable: false
        },
        {
            field: 'status',
            headerName: 'Estado',
            width: 120,
            editable: false
        }
    ];

    if (loading || error || !data) {
        return (
            <MainCard title="Solicitudes de Prestamos">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                        <MuiTypography variant="h6" gutterBottom>
                            Solicitudes de Prestamos
                        </MuiTypography>
                        <MuiTypography gutterBottom>Cargando...</MuiTypography>
                    </Grid>
                </Grid>
            </MainCard>
        );
    }

    return (
        <MainCard title="Solicitudes de Prestamos">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data?.getLoanOrders}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(newPage) => setPageSize(newPage)}
                            pagination
                        />
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LoanOrders;
