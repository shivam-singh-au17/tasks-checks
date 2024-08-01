// Constants
const API_URL = 'https://my-api.com/data';
const FAILURE_RATE = 0.3;

// Utility to simulate random API behavior
function simulateApiBehavior() {
    const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    const statusCodes = [200, 201, 400, 401, 404, 500];
    const method = httpMethods[Math.floor(Math.random() * httpMethods.length)];
    const status = statusCodes[Math.floor(Math.random() * statusCodes.length)];
    const shouldFail = Math.random() < FAILURE_RATE;

    return {
        method,
        status,
        shouldFail
    };
}

// Simulate an API call with HTTP method and status
function simulateApiCall() {
    return new Promise((resolve, reject) => {
        const { method, status, shouldFail } = simulateApiBehavior();

        setTimeout(() => {
            if (shouldFail) {
                reject({ message: 'API failed', status: status });
            } else {
                resolve({ data: 'Sample Data', status: status });
            }
        }, Math.random() * 1000);
    }).then(result => ({ ...result, method }), error => ({ ...error, method }));
}

// Performance monitoring with HTTP details
async function logPerformanceWithHttpDetails(action, start, method, status) {
    const end = performance.now();
    console.log(`[${method}] ${action} took ${end - start} milliseconds. Response Status: ${status}`);
}

// Main function to fetch data with detailed logging
async function fetchData() {
    const start = performance.now();
    const method = simulateApiBehavior().method; // Get the method before the call
    let status;
    try {
        const response = await simulateApiCall();
        status = response.status;
        await logPerformanceWithHttpDetails('API Call', start, method, status);
        return response;
    } catch (error) {
        status = error.status;
        logPerformanceWithHttpDetails('API Call Failure', start, method, status);
        console.error('API error occurred:', error.message);
        return { data: 'Default fallback data', status: status };
    }
}

// Example usage remains the same as before, but now logs include HTTP method and status code
// ...