const threshold = 0.05; // Adjust this value based on model performance and desired sensitivity to anomalies.

const calculateClassWeights = (yTrue) => {
    const classCounts = yTrue.sum(axis = 0).dataSync();
    const totalCount = classCounts.reduce((a, b) => a + b, 0);
    const classWeights = {};

    for (let i = 0; i < classCounts.length; i++) {
        const weight = (1 / classCounts[i]) * (totalCount / classCounts.length);
        classWeights[i] = weight;
    }

    return classWeights;
};

const classWeights = calculateClassWeights(y_train);


function weightedLoss(yTrue, yPred) {
    const weights = tf.tensor1d(Object.values(classWeights));
    return tf.sum(yTrue.mul(yPred).mul(weights), axis = -1);
}

model.compile({ optimizer: 'adam', loss: weightedLoss });


const oversampleMinorityClass = (data, labels) => {
    const anomalyIndices = labels.where(labels.eq(1)).flatten().arraySync();
    const normalIndices = labels.where(labels.eq(0)).flatten().arraySync();

    const minorityClassData = data.gather(anomalyIndices);
    const syntheticSamples = [];

    // Simple example: Duplicate minority class instances
    for (let i = 0; i < (normalIndices.length - anomalyIndices.length); i++) {
        syntheticSamples.push(minorityClassData.slice([i % anomalyIndices.length], [i % anomalyIndices.length + 1]));
    }

    const newMinorityClassData = tf.concat([minorityClassData, ...syntheticSamples], 0);

    const newData = tf.concat([data.gather(normalIndices), newMinorityClassData], 0);
    const newLabels = tf.concat([labels.gather(normalIndices), tf.ones([syntheticSamples.length, 1])], 0);

    return [newData, newLabels];
};

const [newData, newLabels] = oversampleMinorityClass(data, labels);