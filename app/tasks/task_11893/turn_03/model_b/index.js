// Simulated Database (In a real scenario, this would be replaced with an actual database connection)
let database = [];

// Utility to save log data to the database
function saveLogToDatabase(logData) {
    database.push(logData);
    console.log('Log saved to database:', logData);
}

// Function to simulate an API call
function simulateApiCall() {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 1000;
        setTimeout(() => {
            if (Math.random() < 0.3) {
                reject({ message: 'API failed randomly', status: 500 });
            } else {
                resolve({ data: 'Some sample data', status: 200 });
            }
        }, delay);
    });
}

// Performance logging now saves to the database
async function logPerformanceAndSave(action, start, method, status) {
    const end = performance.now();
    const logData = {
        action,
        method,
        status,
        duration: end - start
    };
    saveLogToDatabase(logData);
}

// Main function to fetch data with detailed logging and saving
async function fetchData() {
    const start = performance.now();
    try {
        const response = await simulateApiCall();
        await logPerformanceAndSave('API Call', start, 'GET', response.status);
        return response;
    } catch (error) {
        await logPerformanceAndSave('API Call Failure', start, 'GET', error.status);
        console.error('API error occurred:', error.message);
        return { data: 'Default fallback data', status: 500 };
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
    console.log('Database logs:', database); // Print the database logs
}

exampleUsage();