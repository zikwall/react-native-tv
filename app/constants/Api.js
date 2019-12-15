export const API_DOMAIN = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'https://tv.zikwall.ru'
    : 'https://tv.zikwall.ru';
