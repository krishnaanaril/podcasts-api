import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { createStream, RotatingFileStream } from 'rotating-file-stream';
import path from 'path';
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
import dotEnv from "dotenv";

import router from './routes';

dotEnv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

// create a rotating write stream
const accessLogStream: RotatingFileStream = createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(process.cwd(), 'log')
})

app.use(cors({ origin: true, methods: ['GET'], optionsSuccessStatus: 200}));

app.use(express.json());

const env = process.env.NODE_ENV || 'development';
console.log(`Current Environment: ${env}`);

if(env === "production") {
    app.use(morgan("tiny"));
} else {
    app.use(morgan("combined", { stream: accessLogStream }));
}

app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.use(router);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});