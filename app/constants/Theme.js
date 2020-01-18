export const THEME_STORAGE_KEY = 'app_theme';

const Theme = {
    dark: {
        primaryColor: '#000',
        primaryBackgroudColor: '#fff',
        secondaryColor: '#ccc',
        secondaryBackgroundColor: '#f0f1f4',
        extraColor: '#be2f79',
        extraBackgroundColor: '#802764',
        image: require('../assets/images/Play_650.png')
    },
    light: {
        primaryColor: '#fff',
        primaryBackgroudColor: '#000',
        secondaryColor: '#ccc',
        secondaryBackgroundColor: '#f0f1f4',
        extraColor: '#be2f79',
        extraBackgroundColor: '#802764',
        image: require('../assets/images/Play_650_Light.png')
    },
};

export default Theme;
