export const VISIBILITY = {
    PUBLIC: 10,
    PRIVATE: 20,
    OWNER: 30,
    PREMIUM: 40,
    USERS: 50,
    FRIENDS: 60,
};

export const VISIBILITY_MAP = {
    10: {
        id: 10,
        title: 'Общедоступное',
        description: 'Контент будет доступен всем пользователям, без исключения.',
        disabled: false,
    },
    20: {
        id: 20,
        title: 'Приватное',
        description: 'Контент будет доступен только Вам. Видимость сохраняется.',
        disabled: false,
    },
    40: {
        id: 40,
        title: 'Премиум',
        description: 'Контент будет доступен только премиум пользователям. Видимость сохраняется.',
        disabled: false,
    },
    50: {
        id: 50,
        title: 'Авторизированным',
        description: 'Контент будет доступен всем авторизированным пользователям. Видимость сохраняется.',
        disabled: false,
    },
    60: {
        id: 60,
        title: 'Друзьям',
        description: 'Контент будет доступен только Вашим друзьям. Видимость сохраняется.',
        disabled: false,
    },
};

export const TYPE = {
    CHANNEL: 10,
    FILM: 20
};

export const PINNED = {
    NO: 0,
    YES: 1
};

export const ARCHIVED = {
    NO: 0,
    YES: 1
};

export const AUTH_REQUIRED = {
    NO: 0,
    YES: 1
};

export const YEARS = {
    10: '0+',
    20: '6+',
    30: '12+',
    40: '16+',
    50: '18+'
};

export const is18YearOld = (status) => {
    // 50 это 18 лет
    return status === 50;
};

export const CATEGORIES = {
    10: {
        id: 10,
        title: 'Кино и фильмы',
        description: 'Конент для настоящих киноманов! Про сериалы тоже не забываем.',
        disabled: false,
    },
    20: {
        id: 20,
        title: 'Позновательные',
        description: 'Будет интересно как детям, так и взрослым.',
        disabled: false,
    },
    30: {
        id: 30,
        title: 'Новостные',
        description: 'Ооо! Серьезный контент подкатил. Обходим, обходим стороной!',
        disabled: false,
    },
    40: {
        id: 40,
        title: 'Спортивные',
        description: 'Все мы любим мяч погонять или хотя бы посмотреть на это))',
        disabled: false,
    },
    50: {
        id: 50,
        title: 'Детские',
        description: 'Тут все сказано, контент для самых маленьких.',
        disabled: false,
    },
    60: {
        id: 60,
        title: 'Хобби',
        description: 'Друзья и зрители наверняка оценят ваши старания!',
        disabled: false,
    },
    70: {
        id: 70,
        title: 'Развлекательные',
        description: 'Ну тут самый сок, гоу развлечемся.',
        disabled: false,
    },
    80: {
        id: 80,
        title: 'Музыкальные',
        description: 'Все мы в душе меломаны, просто не знаем этого...',
        disabled: false,
    },
    90: {
        id: 90,
        title: 'Общие',
        description: 'Вы долистали до сюда? Ну у вас и выдержка! Не знаете что бырать - выбирайте общие!',
        disabled: false,
    }
};

export const TYPES = {
    10: {
        id: 10,
        title: 'Фильм',
        description: 'Выберите данный тип контента, если он является, как ни странно, телеканалом :)',
        disabled: false,
    },
    20: {
        id: 20,
        title: 'Телеканал',
        description: 'В данный тип контента входит пратически все: Фильмы, сериалы, анимационные фильмы и т.д.',
        disabled: false,
    },
    30: {
        id: 30,
        title: 'VR контент',
        description: 'Вы сможете погрузиться в дополненную реальность прямо в вашем телефоне!',
        disabled: true
    }
};
