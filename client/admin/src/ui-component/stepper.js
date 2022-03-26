import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import CHANGE_LOAN_STATUS from 'api/gql/mutations/change-loan-status';
import GET_USER from 'api/gql/queries/get-user';

const steps = [
    {
        label: 'Registrado',
        description: `21/01/2022`
    },
    {
        label: 'Documentos requeridos',
        description: 'Enviar requisitos a presentar'
    },
    {
        label: 'Pre Aprobado',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
    },
    {
        label: 'Aprobado',
        description: `Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, find out how to tell if
            they're running and how to resolve approval issues.`
    },
    {
        label: 'Firma Cliente',
        description: `Enviar un mensaje al cliente para la firma`
    },
    {
        label: 'En Ejecución',
        description: ``
    }
];

export default function VerticalLinearStepper({ timeline, loan }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [changeLoanStatus, { loading }] = useMutation(CHANGE_LOAN_STATUS);
    const {
        userLoading,
        data: { getUser: user }
    } = useQuery(GET_USER);

    const viewStepLabel = (step) => {
        const res = {};
        if (step.status === 'REJECTED') {
            res.optional = <Typography variant="caption">{step.description}</Typography>;
            res.error = true;
        }

        return <StepLabel {...res}>{step.label}</StepLabel>;
    };

    const handlerChangeLoanStatus = (loanId, status) => {
        changeLoanStatus({ variables: { loanId, status } });
    };

    const getActions = (step, user) => {
        if (step.id === 'PRE_APPROVED') {
            return (
                <Button variant="contained" onClick={() => handlerChangeLoanStatus(loan?.id, 'PRE_APPROVED')}>
                    Aceptar
                </Button>
            );
        }

        if (step.id === 'APPROVED' && user?.role === 'MANAGER') {
            return (
                <Button variant="contained" onClick={() => handlerChangeLoanStatus(loan?.id, 'APPROVED')}>
                    Aceptar
                </Button>
            );
        }

        if (step.id === 'CLIENT_SIGN') {
            return (
                <Button variant="contained" onClick={() => handlerChangeLoanStatus(loan?.id, 'RUNNING')}>
                    Aceptar
                </Button>
            );
        }

        return <></>;
    };

    useEffect(() => {
        let counter = 0;
        for (let index = 0; index < timeline.length; index += 1) {
            const step = timeline[index];
            if (step?.status === 'PENDING') {
                counter -= 1;
                break;
            }
            counter += 1;
        }
        setActiveStep(counter);
    }, [timeline]);

    if (loading || userLoading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {timeline.map((step, index) => (
                    <Step key={index}>
                        {viewStepLabel(step)}
                        <StepContent>
                            <Typography>{step?.title}</Typography>
                            {getActions(step, user)}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>Prestamo otorgado</Typography>
                </Paper>
            )}
        </Box>
    );
}
