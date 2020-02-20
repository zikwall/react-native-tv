export const random = (arr) => {
    let rand = arr[Math.floor(Math.random() * arr.length)];

    return rand;
};

export function emptyObject(obj) {
    Object.entries(obj).length === 0 && obj.constructor === Object
}
