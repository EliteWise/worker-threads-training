const { parentPort } = require('worker_threads');
const sharp = require('sharp');

parentPort.on('message', async (arrayBuffer) => {
    try {
        const buffer = Buffer.from(arrayBuffer);

        const processedBuffer = await sharp(buffer)
        .greyscale()
        .toBuffer();

        parentPort.postMessage(processedBuffer);
    } catch (err) {
        parentPort.postMessage({ error: err.message });
    }
});