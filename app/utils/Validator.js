export const isValidEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

export const isValidPassword = (password) => {
    if (!password || password.length < 8) {
        return false;
    }

    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
};

export const isValidUsername = (username) => {
    if (!username || username.length < 5 || username.length > 20) {
        return false;
    }

    return /^[a-zA-Z0-9]{5,20}$/.test(username);
};
