import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { createStream, RotatingFileStream } from 'rotating-file-stream';
import path from 'path';

const PORT = process.env.PORT || 3000;

const app: Application = express();

// create a rotating write stream
const accessLogStream : RotatingFileStream = createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(process.cwd(), 'log')
})

app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static("public"));

app.get('/ping', async (_req: Request, res: Response) => {
    res.send({
        message: "pong ping"
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});