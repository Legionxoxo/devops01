import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.routes.js';
import { securityMiddleware } from '#middleware/secuirty.middeware.js';
import usersRoutes from '#routes/users.routes.js';
import { errorMiddleware } from '#middleware/error.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(
  morgan('combined', {
    stream: {
      write: message => {
        logger.info(message.trim());
      },
    },
  })
);

app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('Winston says Hola Amigo !!');
  res.status(200).send('Hello devops!!!!');
});

app.use('/api/auth', authRoutes);

app.use('/api/users', usersRoutes);

app.get('/api', (req, res) => {
  res
    .status(200)
    .json({ message: 'Devops01 running like Usain Bolt !! sybau' });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

//404 handler ->  runs if no other route matched
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//global error middlware -> next(e) -> catches those errors
app.use(errorMiddleware);

export default app;
