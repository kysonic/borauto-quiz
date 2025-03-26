export const createHTMLFromString = <T>(html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    return temp.firstElementChild as T;
};
