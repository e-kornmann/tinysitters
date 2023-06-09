import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodegmailmailer from './routes/nodemailer';
import sitters from './routes/sitters';
import bookings from './routes/bookings';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://tinysitters.vercel.app'],
}));

app.use('/api/sitters', sitters);
app.use('/api/send-email', nodegmailmailer);
app.use('/api/bookings', bookings);

app.get('/', (_req: Request, res: Response) => res.send('API is running'));

app.listen(port, () => console.log(`Server is listening on ${port}`));
