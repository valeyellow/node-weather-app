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

app.get("/weather", (req: Request, res: Response) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide an address!"
        })
    }
    console.log(req.query.address);
    res.send({
        forecast: "Some forecast",
        location: "Some location",
        address: req.query.address
    })
})

app.get("/help/*", (req: Request, res: Response) => {
    res.render("404", {
        title: "404 - Page not found!",
        errorMessage: "The article you are looking for does not exist :(",
        name: "Sumit Mishra"
    })
})

app.get("*", (req: Request, res: Response) => {
    res.render("404", {
        title: "404 - Page not found!",
        errorMessage: "Oops, page not found!",
        name: "Sumit Mishra"
    })
})

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));