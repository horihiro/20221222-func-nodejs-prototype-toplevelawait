import { app, HttpRequest, InvocationContext } from "@azure/functions";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

app.http('screenshot', {
  methods: ['GET'],
  handler: async (_: InvocationContext, request: HttpRequest) => {
    const page = await browser.newPage();
    await page.goto(request.query.get('url') || 'https://www.microsoft.com/en-us/', { waitUntil: 'networkidle2' });
    const pdf = await page.pdf();
    page.close();
    return { body: pdf };
  }
});
