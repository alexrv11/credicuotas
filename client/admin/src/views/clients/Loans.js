import PropTypes from 'prop-types';
import MuiTypography from '@mui/material/Typography';

// material-ui
import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GET_LOANS from 'api/gql/queries/get-loans';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';

const ColorBox = ({ bgcolor, title, data, dark }) => (
    <>
        <Card sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor,
                    color: dark ? 'grey.800' : '#ffffff'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" color="inherit">
                        {title}
                    </Typography>
                )}
                {!title && <Box sx={{ p: 1.15 }} />}
            </Box>
        </Card>
        {data && (
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle2">{data.label}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        {data.color}
                    </Typography>
                </Grid>
            </Grid>
        )}
    </>
);

ColorBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool
};

const Loans = () => {
    const { loading, error, data } = useQuery(GET_LOANS);
    const [pageSize, setPageSize] = useState(25);
    const navigate = useNavigate();
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
            field: 'ownerName',
            headerName: 'Cliente',
            width: 120,
            editable: false
        },
        {
            field: 'statusDescription',
            headerName: 'Estado',
            width: 120,
            editable: false
        }
    ];

    if (loading || error || !data) {
        return (
            <MainCard title="Prestamos">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                        <MuiTypography variant="h6" gutterBottom>
                            Solicitudes de Prestamos
                        </MuiTypography>
                        <CircularProgress />
                    </Grid>
                </Grid>
            </MainCard>
        );
    }

    return (
        <MainCard title="Prestamos">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data?.getLoans}
                            columns={columns}
                            pageSize={pageSize}
                            onRowClick={(data) => navigate(`/admin/clients/loans/${data.id}`)}
                            onPageSizeChange={(newPage) => setPageSize(newPage)}
                            pagination
                        />
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Loans;
