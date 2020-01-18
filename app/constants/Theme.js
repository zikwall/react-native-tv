export const THEME_STORAGE_KEY = 'app_theme';

const Theme = {
    dark: {
        primaryColor: '#000',
        primaryBackgroundColor: '#fff',
        secondaryColor: '#ccc',
        secondaryBackgroundColor: '#f0f1f4',
        extraColor: '#be2f79',
        extraBackgroundColor: '#802764',
        image: require('../assets/images/Play_650.png'),
        logo: require('../assets/images/PlayHubLogo.png'),
        playHubFull: require('../assets/images/PlayHubFull.png'),
        playHubCommunity: require('../assets/images/PlayHubFullCommunity.png')
    },
    light: {
        primaryColor: '#fff',
        primaryBackgroundColor: '#000',
        secondaryColor: '#ccc',
        secondaryBackgroundColor: '#f0f1f4',
        extraColor: '#be2f79',
        extraBackgroundColor: '#802764',
        image: require('../assets/images/Play_650_Light.png'),
        logo: require('../assets/images/PlayHubLogoLight.png'),
        playHubFull: require('../assets/images/PlayHubFullLight.png'),
        playHubCommunity: require('../assets/images/PlayHubFullCommunityLight.png')
    },
};

export default Theme;
