// Mock API function that returns a promise
function apiCall() {
    return new Promise((resolve, reject) => {
        // Simulate a 20% failure rate
        const randomNumber = Math.random();
        if (randomNumber < 0.2) {
            reject(new Error('API failed'));
        } else {
            resolve({ data: 'Success!' });
        }
    });
}

// Retry mechanism with a maximum of 3 retries
let retryCount = 0;
const maxRetries = 3;

function retryApiCall() {
    apiCall()
        .then((response) => {
            // API call succeeded, return the response
            return response;
        })
        .catch((error) => {
            if (retryCount < maxRetries) {
                // Retry the API call after a short delay
                setTimeout(() => {
                    retryCount++;
                    retryApiCall();
                }, 500);
            } else {
                // Maximum retries exceeded, return an error
                throw error;
            }
        });
}

// Set a timeout to prevent the application from hanging indefinitely
setTimeout(() => {
    throw new Error('API call timed out');
}, 5000);

// Measure the time it takes for the API call to complete
const startTime = performance.now();

retryApiCall()
    .then((response) => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        console.log(`API call succeeded in ${responseTime}ms`);
        console.log(`Response: ${JSON.stringify(response)}`);
    })
    .catch((error) => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        console.error(`API call failed in ${responseTime}ms`);
        console.error(`Error: ${error.message}`);
    });