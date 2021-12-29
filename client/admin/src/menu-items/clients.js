// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const clients = {
    id: 'clients',
    title: 'Clientes',
    type: 'group',
    children: [
        {
            id: 'request-loans',
            title: 'Pedidos de Prestamo',
            type: 'item',
            url: '/clients/orders',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'loans',
            title: 'Prestamos',
            type: 'item',
            url: '/clients/loans',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'client-profiles',
            title: 'Clientes',
            type: 'item',
            url: '/clients/profiles',
            icon: icons.IconShadow,
            breadcrumbs: false
        }
    ]
};

export default clients;
