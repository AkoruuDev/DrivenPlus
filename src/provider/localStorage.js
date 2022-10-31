function setItem(keyObj, value) {
    const obj = JSON.stringify(value);
    const element = localStorage.setItem(keyObj, obj);
    return element;
}

function getItem(keyObj) {
    const obj = JSON.parse(keyObj);
    const element = localStorage.getItem(obj);
    return element;
}

export { getItem, setItem }