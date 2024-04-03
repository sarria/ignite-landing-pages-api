# Document Generator

This project provides an API endpoint at `/page/api/scrape.ts` for scraping a website and get its metadata, images and colors.

## Usage

### Making a Request

Send a POST request to /page/api/scrape.ts with a JSON payload matching the following format:

Example request:

```json
{
    "url": "https://example.com",
}
```

This will return an JSON object with the scraped data.

### Authentication

This API uses API keys for authentication. Include your application's API key in the request header. If you do not have an API key yet for your application, please reach out to project maintainer.

```
X-Api-Key: <your-api-key>
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 References

Feel free to check:

-   **[astro](https://docs.astro.build)**
-   **[puppeteer](https://pptr.dev/)**
-   **[zod](https://zod.dev/)**
