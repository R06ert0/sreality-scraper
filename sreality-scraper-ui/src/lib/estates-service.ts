import {EstatesResponse} from "../model/estates-response";

export class EstatesService {
    private _url = "http://localhost:3000/estates";

    async loadEstates(pageIndex: number, pageSize: number = 20): Promise<EstatesResponse> {
        const response = await fetch(this._url + "?" + new URLSearchParams({
            pageIndex: String(pageIndex),
            pageSize: String(pageSize),
        }));
        return await response.json();
    }
}