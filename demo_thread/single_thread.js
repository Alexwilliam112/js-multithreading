const loopCount = 250000;
const startTime = Date.now();

for (let i = 0; i < loopCount; i++) {
    console.log(i);
}

const endTime = Date.now();
const duration = (endTime - startTime) / 1000;
console.log(`Single-threaded total runtime: ${duration} seconds`);