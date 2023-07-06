import puppeteer, {Page} from "puppeteer";
import {EstateData} from "./model/estate-data";

const url = "https://www.sreality.cz/en/search/for-sale/apartments";

export async function scrapeEstateDataList() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // There are 20 items on each page
    const numberOfPages = 25;
    let estateDataList: EstateData[] = [];
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        await _changePage(page, pageNumber);
        const estateDataListPerPage: EstateData[] = await _getEstateDataListPerPage(page);
        estateDataList = [...estateDataList, ...estateDataListPerPage];
    }
    await browser.close();
    console.log("[LOG]: " + estateDataList.length + " ITEMS HAVE BEEN SCRAPED FROM " + url);
    return estateDataList;
}

const _changePage = async (page: Page, pageNumber: number) => {
    // Wait until the paging buttons loads
    await page.waitForSelector(".btn-paging");
    await page.evaluate((pageNumber: number) => {
        const pageBtn = Array.from(document.querySelectorAll(".btn-paging")).find(btn => btn.textContent === `${pageNumber}`) as HTMLAnchorElement;
        pageBtn.click();
    }, pageNumber);
};

const _getEstateDataListPerPage = async (page: Page) => {
    // Wait until the list of estates loads
    await page.waitForSelector(".dir-property-list");
    return await page.evaluate(() => {
        // It is not possible to use functions outside the scope of the evaluate method
        const filterEstateElements = (elements: Element[]) => {
            return elements.filter(el => el.className.includes("property"));
        }
        const mapEstateElementsToData = (elements: Element[]): EstateData[] => {
            return elements.map(estateElement => {
                const title = estateElement.querySelector("h2")?.innerText || "";
                const img = estateElement.querySelector("img")?.src || "";
                return {
                    title,
                    img
                }
            });
        }
        // Estate blocks differs from other dir-property-list children by this class name
        const estateElements = document.getElementsByClassName("dir-property-list")?.[0]?.children || [];
        const filteredElements = filterEstateElements(Array.from(estateElements));
        return mapEstateElementsToData(filteredElements);
    });
};
