export const THEME_STORAGE_KEY = 'app_theme';

const WhiteImages = {
    image: require('../assets/images/Play_650_Light.png'),
    logo: require('../assets/images/PlayHubLogoLight.png'),
    playHubFull: require('../assets/images/PlayHubFullLight.png'),
    playHubCommunity: require('../assets/images/PlayHubFullCommunityLight.png')
};

const BlackImages = {
    image: require('../assets/images/Play_650.png'),
    logo: require('../assets/images/PlayHubLogo.png'),
    playHubFull: require('../assets/images/PlayHubFull.png'),
    playHubCommunity: require('../assets/images/PlayHubFullCommunity.png')
};

const DefaultExtraScheme = {
    secondaryColor: '#ccc',
    secondaryBackgroundColor: '#f0f1f4',
    extraColor: '#be2f79',
    extraBackgroundColor: '#802764',
    linkColor: '#397aff'
};

const Theme = {
    dark: {
        info: {
            name: 'Dark',
        },
        primaryColor: '#fff',
        primaryBackgroundColor: '#000',
        ...DefaultExtraScheme,
        ...WhiteImages,
        ... { linkColor: '#fff' }
    },
    light: {
        info: {
            name: 'Light',
        },
        primaryColor: '#000',
        primaryBackgroundColor: '#fff',
        ...DefaultExtraScheme,
        ...BlackImages,
    },
    night: {
        info: {
            name: 'Night',
        },
        primaryColor: '#fff',
        primaryBackgroundColor: '#35465C',
        ...DefaultExtraScheme,
        ...WhiteImages
    },
    blue_grey: {
        info: {
            name: 'Blue Grey',
        },
        primaryColor: '#fff',
        primaryBackgroundColor: '#36454f',
        ...DefaultExtraScheme,
        ...WhiteImages
    },
    facebook: {
        info: {
            name: 'Facebook',
        },
        primaryColor: '#fff',
        primaryBackgroundColor: '#3b5998',
        ...DefaultExtraScheme,
        ...WhiteImages,
        ...{ secondaryBackgroundColor: '#dfe3ee'},
        ...{ linkColor: '#397aff' }
    },
    cappuccino: {
        info: {
            name: 'Cappuccino',
        },
        primaryColor: '#fff',
        primaryBackgroundColor: '#854442',
        ...DefaultExtraScheme,
        ...WhiteImages
    },
    pink: {
        info: {
            name: 'Pink',
        },
        primaryColor: '#fff',
        primaryBackgroundColor: '#f6abb6',
        ...DefaultExtraScheme,
        ...WhiteImages
    },
    blue: {
        info: {
            name: 'Blue',
        },
        primaryColor: '#fff',
        primaryBackgroundColor: '#011f4b',
        ...DefaultExtraScheme,
        ...WhiteImages,
        ...{ linkColor: '#397aff' }
    },
    yellow: {
        info: {
            name: 'Yellow',
        },
        primaryColor: '#000',
        primaryBackgroundColor: '#ffcc5c',
        ...DefaultExtraScheme,
        ...BlackImages,
        ...{ secondaryColor: '#fff'},
    }
};

export default Theme;
