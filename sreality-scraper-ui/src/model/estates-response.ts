import {EstateData} from "./estate-data";

export type EstatesResponse = {
    estates: EstateData[];
    total: number;
};