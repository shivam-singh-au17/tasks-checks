export function logger(logMessage) {
    const logEntry = document.createElement('div');
    logEntry.textContent = logMessage;
    logContainer.appendChild(logEntry);
}