// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

const assistant = {
    items: [
        {
            id: 'clients',
            title: 'Clientes',
            type: 'group',
            children: [
                {
                    id: 'request-loans',
                    title: 'Solicitudes de Prestamo',
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
                },
                {
                    id: 'type-loans',
                    title: 'Tipos de prestamo',
                    type: 'item',
                    url: '/loans/loan-types',
                    icon: icons.IconShadow,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default assistant;
