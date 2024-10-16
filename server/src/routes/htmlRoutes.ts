import path from 'node:path';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

const app = express();
const PORT = 3001;


// TODO: Define route to serve index.html
router.get('/', (_req, res) => {  // Define a route to serve index.html
  res.sendFile(path.join(__dirname, '../public/index.html')); // Send a file to the client
});

app.listen(PORT, () => // listen() method is responsible for listening for incoming connections on the specified port
    console.log(`Example app listening at http://localhost:${PORT}`) // Log a message to the console
  );
  
export default router;

// FIRST