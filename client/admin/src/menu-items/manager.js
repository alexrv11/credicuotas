// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import assistant from './assistant';
import dashboard from './dashboard';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

const manager = {
    items: [dashboard, ...assistant.items]
};

export default manager;
