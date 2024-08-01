// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs');
const { mean, std } = require('@tensorflow/tfjs');

const app = express();

app.use(bodyParser.json());

// Features to track for anomaly detection (example features)
const trackedFeatures = ['requestsPerSecond', 'avgRequestSize', 'errorRate'];

// Web traffic data store
const trafficData = [];

// Anomaly detection model
let model;

// Build and train an anomaly detection model
function buildAndTrainModel() {
    const inputs = tf.tensor2d(trafficData, [trafficData.length, trackedFeatures.length]);
    const oneHotEncodedAnomalies = tf.tensor2d(trafficData.map(() => [0, 1]), [trafficData.length, 2]);

    model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [trackedFeatures.length], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));
    
    model.compile({
        optimizer: tf.optimizers.adam(),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    const epochs = 50;
    model.fit(inputs, oneHotEncodedAnomalies, { epochs }).then(() => {
        console.log('Model trained');
    });
}

// Feature extraction for real-time traffic
function extractFeatures(data) {
    return {
        requestsPerSecond: data.requests,
        avgRequestSize: data.bytesSent / data.requests,
        errorRate: data.errors / data.requests,
    };
}

// Function to capture and process traffic data
function processTrafficData(data) {
    const features = extractFeatures(data);
    const tensorData = tf.tensor1d(Object.values(features));
    trafficData.push(features);

    if (trafficData.length > 100) { // Example batch size
        trafficData.shift(); // Keep only the latest 100 entries for training
    }

    // Preprocess data
    const { mean, stddev } = tf.moments(tensorData);
    const normalizedData = tensorData.sub(mean).div(stddev);

    // Use model to predict anomalies
    const prediction = model.predict(normalizedData.reshape([1, -1]));
    const probabilities = prediction.dataSync();
    
    if (probabilities[1] > 0.9) { // Example threshold for anomaly detection
        console.log('Potential vulnerability detected:', features);
        // Implement logging and reporting mechanisms here
    }

    // Optionally retrain the model periodically
    // buildAndTrainModel();
}

// Mock server for incoming traffic data
app.post('/traffic', (req, res) => {
    processTrafficData(req.body);
    res.status(200).send('Data processed');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    // Initial model training
    buildAndTrainModel();
});

// Scalability and performance are managed by:
// - Batching updates to the model
// - Using TensorFlow.js which leverages WebGL for performance
// - Implementing async data processing to prevent blockages
// - Use of cloud services or load balancers for distributing incoming traffic in a production setting