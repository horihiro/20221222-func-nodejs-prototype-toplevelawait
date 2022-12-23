import { app, HttpRequest } from "@azure/functions";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

app.http('url2pdf', {
  methods: ['GET'],
  handler: async (request: HttpRequest) => {
    const page = await browser.newPage();
    await page.goto(request.query.get('url') || 'https://www.microsoft.com/en-us/', { waitUntil: 'networkidle2' });
    const pdf = await page.pdf();
    page.close();
    return { body: pdf };
  }
});
