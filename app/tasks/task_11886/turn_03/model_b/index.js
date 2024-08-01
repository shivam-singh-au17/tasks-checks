const crossValidate = (data, labels, k = 5) => {
    const folds = [];
    const foldSize = Math.floor(data.shape[0] / k);

    for (let i = 0; i < k; i++) {
        const start = i * foldSize;
        const end = (i === k - 1) ? data.shape[0] : (i + 1) * foldSize;

        const testData = data.slice([start, 0], [end, data.shape[1]]);
        const testLabels = labels.slice([start], [end]);

        const trainData = tf.concat([data.slice([0, 0], [start, data.shape[1]]), data.slice([end, 0], [data.shape[0], data.shape[1]])], 0);
        const trainLabels = tf.concat([labels.slice([0], [start]), labels.slice([end], [labels.shape[0]])], 0);

        folds.push({ trainData, trainLabels, testData, testLabels });
    }

    let totalPrecision = 0;
    let totalRecall = 0;
    let totalF1Score = 0;

    for (const fold of folds) {
        const model = buildAndTrainModel(fold.trainData, fold.trainLabels);
        const predictions = model.predict(fold.testData);
        const scores = predictions.dataSync();

        const actualAnomalies = fold.testLabels.dataSync().reduce((a, b) => a + b, 0);
        const detectedAnomalies = scores.reduce((a, b) => a + (b > threshold ? 1 : 0), 0);

        const truePositives = scores.reduce((a, b, i) => a + (b > threshold && fold.testLabels.dataSync()[i] === 1 ? 1 : 0), 0);
        const falsePositives = detectedAnomalies - truePositives;

        const precision = truePositives / detectedAnomalies;
        const recall = truePositives / actualAnomalies;
        const f1Score = 2 * (precision * recall) / (precision + recall);

        totalPrecision += precision;
        totalRecall += recall;
        totalF1Score += f1Score;
    }

    return {
        precision: totalPrecision / k,
        recall: totalRecall / k,
        f1Score: totalF1Score / k
    };
};