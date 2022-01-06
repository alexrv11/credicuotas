// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

const admin = {
    items: [
        {
            id: 'administrator',
            title: 'Administracion',
            type: 'group',
            children: [
                {
                    id: 'staff-profiles',
                    title: 'Empleados',
                    type: 'item',
                    url: '/staff/profiles',
                    icon: icons.IconShadow,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default admin;
