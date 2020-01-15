const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const isHermes = () => global.HermesInternal != null;


export const env = () => {
    return isDev() ? 'dev' : 'prod';
};

export const isDev = () => {
    return development;
};

export const isProd = () => {
    return !development;
};
