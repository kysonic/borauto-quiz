export function throttle(func: Function, delay: number) {
    let lastCall = 0;
    return function (this: any, ...args: unknown[]) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

export function mapObjectValues(object: object, fn: Function) {
    return Object.fromEntries(
        Object.entries(object).map(([k, v]) => [k, fn(v)]),
    );
}

window.domUi = {
    emit: (event: string, payload: any) => {
        document
            .getElementById('scene')
            ?.dispatchEvent(new CustomEvent(event, { detail: payload }));
    },
};
