export const SESSION_TOKEN_KEY = 'session';
export const IDENTITY_STORAGE_KEY = 'identity';

export const ERROR_INVALID_PASSWORD = {
    'code': 5,
    'message': 'Пароль должен содержать не менее восьми символов, как минимум одну заглавную букву, одну строчную букву и одну цифру.',
    'attributes': [
        'password'
    ]
};

export const ERROR_INVALID_USERNAME = {
    'code': 4,
    'message': 'Имя пользователя должен содержать минимум пять символов, как минимум одну заглавнюу букву, строчную букву и цифру.',
    'attributes': [
        'username'
    ]
};

export const ERROR_INVALID_EMAIL_ADRESS = {
    'code': 2,
    'message': 'Не правильный адрес электронной почты.',
    'attributes': [
        'email'
    ]
};

export const ERROR_INVALID_NAME = {
    'code': 3,
    'message': 'Имя может содержать буквы латинского алфавита и разделитель в виде пробела, смотрите сами [a-zA-Z \', .-]',
    'attributes': [
        'name'
    ]
};
