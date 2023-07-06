import {EstatesData} from "../model/estates-data"

export class EstatesService {
    private _url = "http://localhost:3000/estates";

    async loadEstates(pageIndex: number, pageSize: number = 20): Promise<EstatesData[]> {
        const response = await fetch(this._url + "?" + new URLSearchParams({
            pageIndex: String(pageIndex),
            pageSize: String(pageSize),
        }));
        return await response.json();
    }
}