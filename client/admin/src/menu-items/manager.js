import assistant from './assistant';
import dashboard from './dashboard';

const manager = {
    items: [dashboard, ...assistant.items]
};

export default manager;
