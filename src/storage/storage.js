

const getFromSessionStorage = (key, defaultValue) => {
    const infoFromStorage = sessionStorage.getItem(key);
    // console.log(key, defaultValue);
    if (!infoFromStorage) {
        return defaultValue;
    } else {
        return (infoFromStorage);
    }
}

// export const getFromLocalStorage = (key, defaultValue) => {
//     const infoFromStorage = localStorage.getItem(key);
//     if (!infoFromStorage) {
//         return defaultValue;
//     } else {
//         return (infoFromStorage);
//     }
// }


export default getFromSessionStorage;