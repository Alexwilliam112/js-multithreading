const express = require('express');
const app = express();
const PORT = 3000;

// Funciton to simulate an async task
function asyncFireAndForgetTask(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject(`===== Something went wrong for user ${userId}`);
      } else {
        console.log(`===== Async task completed for user ${userId}`);
        resolve();
      }
    }, 2000);
  });
}

app.get('/with-await', async (req, res) => {
  const userId = req.query.userId || 'anonymous';

  // Task is awaited, so it blocks the request until the task is completed
  try {
    await asyncFireAndForgetTask(userId);
  } catch (err) {
    console.error('Task Failed. error:', err);
  }

  // Immediate response
  res.send(`Request received for user ${userId}`);
});

app.get('/without-await', (req, res) => {
  const userId = req.query.userId || 'anonymous';

  // Task fire-and-forget, does not block the request because it is async and we don't await it
  asyncFireAndForgetTask(userId)
    .catch(err => {
      console.error('Task Failed. error:', err);
    });

  // Immediate response
  res.send(`Request received for user ${userId}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
