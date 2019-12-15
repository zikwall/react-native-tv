export const random = (arr) => {
    let rand = arr[Math.floor(Math.random() * arr.length)];

    return rand;
};
