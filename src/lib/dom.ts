export const createHTMLFromString = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    return temp.firstElementChild;
};
