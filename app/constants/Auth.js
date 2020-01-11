export const SESSION_TOKEN_KEY = 'session';
export const IDENTITY_STORAGE_KEY = 'identity';

export const ERROR_INVALID_PASSWORD = {
    'code': 5,
    'message': 'Password may contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number.',
    'attributes': [
        'password'
    ]
};

export const ERROR_INVALID_USERNAME = {
    'code': 4,
    'message': 'Username may contain next characters minimum five characters, at least uppercase letter, lowercase letter and number.',
    'attributes': [
        'username'
    ]
};

export const ERROR_INVALID_EMAIL_ADRESS = {
    'code': 2,
    'message': 'Invalid email adress.',
    'attributes': [
        'email'
    ]
};

export const ERROR_INVALID_NAME = {
    'code': 3,
    'message': 'Incorrect name. The name may contain letters of the Latin alphabet and a separator in the form of a space, see for yourself [a-zA-Z\',.-]',
    'attributes': [
        'name'
    ]
};
