import chromium from '@sparticuz/chromium-min'
import puppeteer, { type PaperFormat } from 'puppeteer-core'


const getBrowserOptions = async () => {
    return import.meta.env.AWS_REGION
        ? {
              args: chromium.args,
              executablePath: await chromium.executablePath(import.meta.env.CHROMIUM_PATH),
              headless: chromium.headless,
              ignoreHTTPSErrors: true,
          }
        : {
              args: chromium.args,
              executablePath:
                  process.platform === 'win32'
                    //   ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
                      ? 'C:\\Users\\jauns\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
                      : process.platform === 'linux'
                      ? '/usr/bin/google-chrome'
                      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
              headless: true,
          }
}

export const getScrapeUrl = async (url: string) => {
    const browserOptions = await getBrowserOptions()
    const browser = await puppeteer.launch(browserOptions)
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })

    const title = await page.title();

    const metaTags = await page.evaluate(() => {
        const tags = Array.from(document.getElementsByTagName('meta'));
        return tags.map(tag => {
            return {
              name: tag.getAttribute('name') || tag.getAttribute('property') || null,
              content: tag.getAttribute('content'),
            };
        })
        .filter(tag => tag.name); // Filter out tags without name and property
    });	

    await browser.close();    

    return {
        url,
        title,
        metaTags
    };
}
