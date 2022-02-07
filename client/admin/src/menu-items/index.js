import manager from './manager';
import admin from './admin';
import assistant from './assistant';

// ==============================|| MENU ITEMS ||============================== //

const getMenu = (role) => {
    if (role === 'CREDIT_ASSISTANT') {
        return assistant;
    }

    if (role === 'ADMIN') {
        return admin;
    }

    if (role === 'MANAGER') {
        return manager;
    }

    return {};
};

export default getMenu;
