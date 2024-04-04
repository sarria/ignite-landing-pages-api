import chromium from '@sparticuz/chromium-min'
import puppeteer, { type PaperFormat } from 'puppeteer-core'

export const pdfFormats = ['letter', 'legal', 'tabloid', 'ledger', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6'] as const

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
                      ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
                      : process.platform === 'linux'
                      ? '/usr/bin/google-chrome'
                      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
              headless: true,
          }
}

export const getPdfFromUrl = async (url: string, size: PaperFormat) => {
    const browserOptions = await getBrowserOptions()
    const browser = await puppeteer.launch(browserOptions)
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    const pdf = await page.pdf({
        format: size,
        printBackground: true,
        landscape: true,
    })

    // await browser.close()
    return pdf
}
