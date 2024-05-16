import express from 'express';
import { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import createError from 'http-errors';
import cors from 'cors';
import { router } from './src/routes/index.js';
import { apiKeyMiddleware } from './middleware/apiKey.js'; // Importing the named export 'apiKeyMiddleware' from the module
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

app.use(apiKeyMiddleware);

// Routes
app.use('/api', router);

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Connect to MongoDB
connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });
