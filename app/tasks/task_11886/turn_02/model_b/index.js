const minorityClassData = ""// get minority class data
const noisyMinorityClassData = minorityClassData.map(data => data.add(tf.random.normal(data.shape, 0, 0.1)));
const oversampledData = tf.concat([data, noisyMinorityClassData], 0);
const lof = new tf.Lof();
const predictions = lof.predict(data);
const threshold = 0.05; // Lower threshold for anomaly detection

model.compile({
    optimizer: 'adam',
    loss: tf.losses.weightedMeanSquaredError(
        tf.tensor1d([1, 10]) // Weights for the classes
    )
});