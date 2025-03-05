export function formatTime(milliseconds: number) {
    const mins = Math.floor(milliseconds / 60000);
    const remainingMs = milliseconds % 60000;
    const secs = Math.floor(remainingMs / 1000);
    const ms = remainingMs % 1000;

    // Форматируем компоненты с ведущими нулями
    const mm = String(mins).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');
    const msms = String(Math.floor(ms / 10)).padStart(2, '0'); // Две цифры для миллисекунд

    return `${mm}:${ss}:${msms}`;
}
