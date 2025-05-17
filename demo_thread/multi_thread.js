const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');
const cpuCount = os.cpus().length;

const loopCount = 250000;
const threadCount = cpuCount;

if (isMainThread) {
  const startTime = Date.now();
  let finished = 0;

  for (let t = 0; t < threadCount; t++) {
    const chunkSize = Math.ceil(loopCount / threadCount);
    const start = t * chunkSize;
    const end = Math.min(start + chunkSize, loopCount);

    const worker = new Worker(__filename, {
      workerData: { start, end }
    });

    worker.on('exit', () => {
      finished++;
      if (finished === threadCount) {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log('Multi-threaded total runtime:', duration, 'seconds');
      }
    });

    worker.on('error', (err) => {
      console.error('Worker error:', err);
    });
  }
} else {
  const { start, end } = workerData;
  for (let i = start; i < end; i++) {
    console.log(i)
  }
  parentPort.close();
}