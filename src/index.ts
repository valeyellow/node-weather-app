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

// setting up the path
const publicDirectoryPath: string = path.join(__dirname, "../public");
const viewsPath: string = path.join(__dirname, "../templates/views");
const partialsPath: string = path.join(__dirname, "../templates/partials");

// config express to use hbs as view engine and setting up the views path
app.set('view engine', 'hbs');
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req: Request, res: Response) => {
    res.render('index', {
        title: "Weather",
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
        helpText: "We are happy to help!",
        title: "Help",
        name: "Sumit Mishra"
    })
})

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));