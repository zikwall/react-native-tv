export const buildUserId = (user) => {
    if (!user.profile || !user.profile.name) {
        return `id${user.id}`;
    }

    return user.profile.name;
};

export const makeUserAvatar = (user) => {
    if (!user.profile || !user.profile.avatar) {
        return require('../assets/images/creative-zebra-avatar.png');
    }

    return { uri: user.profile.avatar };
};
