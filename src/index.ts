import express, { Server, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import hbs from 'hbs';

dotenv.config();

if(!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Server = express();

const publicDirectoryPath: string = path.join(__dirname, "../public");

app.set('view engine', 'hbs');

app.use(express.static(publicDirectoryPath));

app.get("", (req: Request, res: Response) => {
    res.render('index', {
        title: "Weather app",
        name: "Sumit Mishra"
    });
})

app.get("/about", (req: Request, res: Response) => {
    res.render('about', {
        title: "About Me",
        name: "Sumit Mishra"
    })
})

app.get("/help", (req: Request, res: Response) => {
    res.render('help', {
        helpTitle: "We are happy to help!"
    })
})

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));