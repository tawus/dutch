export default function throttle(fn, limit) {
    let waiting = false;
    return function(...args) {
        if (!waiting) {
            fn.apply(this, args);
            waiting = true;
            window.setTimeout(() => {
                waiting = false;
            }, limit);
        }
    };
}
