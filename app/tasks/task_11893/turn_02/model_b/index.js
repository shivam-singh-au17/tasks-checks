// Modified logPerformance function
function logPerformance(action, start, method, statusCode, url) {
    const end = performance.now();
    console.log(`${action} ${method} ${url} - Status: ${statusCode} took ${end - start} milliseconds`);
}

// Modified simulateApiCall function
function simulateApiCall(url, method = 'GET') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < FAILURE_RATE) {
                reject(new Error('API failed randomly'));
            } else {
                resolve({ data: 'Some sample data', statusCode: 200 });
            }
        }, randomInt(500, 1500)); // Simulate network delay
    });
}

// Modified fetchData function
async function fetchData(url, method = 'GET') {
    const start = performance.now();
    try {
        const response = await simulateApiCall(url, method);
        logPerformance('API Call', start, method, response.statusCode, url);
        return response;
    } catch (error) {
        logPerformance('API Call Failure', start, method, 500, url); // Assuming a 500 status code for errors
        console.error('API error occurred:', error.message);
        // Graceful degradation here
        return fetchDataFallback();
    }
}

// Example usage
async function exampleUsage() {
    console.log('Starting data fetch...');
    const data = await fetchData(API_URL);
    console.log('Data fetched:', data);
    console.log('Adding some delay to simulate other operations...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Fetching data again...');
    const data2 = await fetchData(API_URL, 'POST'); // Example of a POST request
    console.log('Data fetched on second call:', data2);
}

// Run example
exampleUsage();