import express, { Server, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

if(!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const publicDirectoryPath: string = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));