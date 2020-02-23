export const ORIGIN_PLAYER = 'origin';
export const NATIVE_PLAYER = 'native';
export const JW_PLAYER = '1';
export const OPENPLAYERJS = '2';
export const VIDEOJS = '3';
export const PLYR = '4';

export const PLAYERS_MAP = {
    'origin': {
        id: 'origin',
        title: 'Оригинальный поток',
        description: 'Это самый простой плеер, пустой в душе, но воспроизводит все!',
        disabled: false,
    },
    'native': {
        id: 'native',
        title: 'Нативный плеер Android/iOS',
        description: 'Более продвинутый плеер, но в данное время не поддерживает рекламу.',
        disabled: false,
    },
    '1': {
        id: '1',
        title: 'Функциональный',
        description: 'Хороший плеер, удобный и простой, есть возможность вставки рекламы!',
        disabled: false,
    },
    '2': {
        id: '2',
        title: 'RedPlayer',
        description: 'Такой же функциональный как и предыдущий, есть возможность вставки рекламы!',
        disabled: false,
    },
};
