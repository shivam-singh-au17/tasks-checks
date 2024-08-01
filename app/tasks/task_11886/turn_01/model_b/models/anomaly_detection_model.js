export class AnomalyDetectionModel {
    constructor() {
        this.data = [];
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({ units: 10, inputShape: [6] }));
        this.model.add(tf.layers.dense({ units: 1 }));
        this.model.compile({ optimizer: tf.optimizers.adam(), loss: 'meanSquaredError' });
    }

    addData(features) {
        this.data.push(features);
    }

    train() {
        const xs = tf.tensor2d(this.data, [this.data.length, 6]);
        const ys = tf.tensor2d([[0]], [1, 1]); // Assume normal data for simplicity
        this.model.fit(xs, ys, { epochs: 100 });
    }

    getFeatures() {
        return this.data;
    }

    async predict(features) {
        const xs = tf.tensor2d(features, [1, 6]);
        const prediction = await this.model.predict(xs);
        return prediction.dataSync()[0];
    }
}