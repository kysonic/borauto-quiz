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
