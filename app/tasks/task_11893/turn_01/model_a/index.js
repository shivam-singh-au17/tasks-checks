// Constants
const API_URL = 'https://my-api.com/data';
const FAILURE_RATE = 0.3; // 30% chance of failure for demonstration purposes

// Utility functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulateApiCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < FAILURE_RATE) {
                reject(new Error('API failed randomly'));
            } else {
                resolve({ data: 'Some sample data' });
            }
        }, randomInt(500, 1500)); // Simulate network delay
    });
}

// Performance monitoring
function logPerformance(action, start) {
    const end = performance.now();
    console.log(`${action} took ${end - start} milliseconds`);
}

// Graceful degradation: Fallback function
function fetchDataFallback() {
    return { data: 'Default data when API fails' };
}

// Main function to fetch data with logging and error handling
async function fetchData() {
    const start = performance.now();
    try {
        const response = await simulateApiCall();
        logPerformance('API Call', start);
        return response;
    } catch (error) {
        logPerformance('API Call Failure', start);
        console.error('API error occurred:', error.message);
        // Graceful degradation here
        return fetchDataFallback();
    }
}

// Example usage
async function exampleUsage() {
    console.log('Starting data fetch...');
    const data = await fetchData();
    console.log('Data fetched:', data);
    console.log('Adding some delay to simulate other operations...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Fetching data again...');
    const data2 = await fetchData();
    console.log('Data fetched on second call:', data2);
}

// Run example
exampleUsage();

// Explanation:

// 1. **API Simulation**: We simulate an API call using `simulateApiCall()`. This function uses `Math.random()` to decide whether the API should fail or succeed based on `FAILURE_RATE`.

// 2. **Performance Logging**: Every significant action (API call or its failure) logs its performance by measuring the time it took to complete using `performance.now()`. This helps in monitoring how well the application is performing.

// 3. **Graceful Degradation**: If the API call fails, we don't just stop; instead, we call `fetchDataFallback()` to provide some default or cached data. This ensures that the application can still provide some value to the user rather than breaking entirely.

// 4. **Error Handling**: In the `fetchData` function, we wrap our API simulation call in a try-catch block. If the API call fails, it catches the error, logs it, and then falls back to the degraded state.

// 5. **Usage Example**: The `exampleUsage` function demonstrates how you might call `fetchData()` in a real-world scenario, including adding artificial delays to simulate other operations or subsequent API calls.

// This example encapsulates how you can structure your JavaScript code to simulate API failures, monitor performance, and implement mechanisms for graceful degradation, ensuring that your application remains functional and provides a good user experience even when backend services are unstable.