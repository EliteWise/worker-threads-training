    const { Worker } = require('worker_threads');
    const fs = require('fs');

    function processImage(filepath) {
        return new Promise((resolve, reject) => {

            const worker = new Worker('./imageWorker.js');
            const buffer = fs.readFileSync(filepath);

            // Convert Buffer to ArrayBuffer for data transfer
            const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

            worker.postMessage(arrayBuffer);
            worker.on('message', resolve);
            worker.on('error', reject);
        });
    }

    processImage('arthur.jpg').then((processedImage) => {
        const outputBuffer = Buffer.isBuffer(processedImage) ? processedImage : Buffer.from(processedImage);
        fs.writeFileSync('processed.jpg', outputBuffer);
        console.log('Image processed and saved!');
    });