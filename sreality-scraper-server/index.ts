import express from "express";
import cors from "cors";
import {getEstates, initDb, insertEstates} from "./database";
import {scrapeEstateDataList} from "./scraper"

const app = express();
const port = 3000;

app.use(
    cors({origin: ['http://localhost:8080', 'http://127.0.0.1:8080']})
);

app.get('/estates', async (req: any, res: any) => {
    const {pageIndex, pageSize} = req.query;
    const estates = await getEstates(pageIndex, pageSize);
    res.status(200);
    res.send(estates);
})

app.listen(port, () => {
    console.log('The application is listening on port 3000!');
    initServer();
})

const initServer = async () => {
    const estatesList = await scrapeEstateDataList();
    await initDb();
    await insertEstates(estatesList);
};