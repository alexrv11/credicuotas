import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const ClientOrders = Loadable(lazy(() => import('views/clients/LoanOrders')));
const ClientLoans = Loadable(lazy(() => import('views/clients/Loans')));
const ClientLoanDetails = Loadable(lazy(() => import('views/clients/LoanDetails')));
const ClientProfiles = Loadable(lazy(() => import('views/clients/Profiles')));
const StaffProfiles = Loadable(lazy(() => import('views/staff/Profiles')));

const LoanTypes = Loadable(lazy(() => import('views/loans/loanTypes')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/clients/orders',
            element: <ClientOrders />
        },
        {
            path: '/clients/loans',
            element: <ClientLoans />
        },
        {
            path: '/clients/loans/:id',
            element: <ClientLoanDetails />
        },
        {
            path: '/clients/profiles',
            element: <ClientProfiles />
        },
        {
            path: '/staff/profiles',
            element: <StaffProfiles />
        },
        {
            path: '/loans/loan-types',
            element: <LoanTypes />
        }
    ]
};

export default MainRoutes;
