# Document Generator

This project provides an API endpoint at `/page/api/pdf.ts` for generating PDFs from URLs. The service accepts a URL and a specified PDF format, then returns the generated PDF.

-   [Document Generator](#document-generator)
    -   [Usage](#usage)
        -   [Making a Request](#making-a-request)
        -   [Authentication](#authentication)
    -   [🚀 Project Structure](#-project-structure)
    -   [🧞 Commands](#-commands)
    -   [👀 References](#-references)

## Usage

### Making a Request

To generate a PDF, send a POST request to /page/api/pdf.ts with a JSON payload matching the following format:

| Key    | Value                                                                                                     | Description                                                                     |
| :----- | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| `url`  | string                                                                                                    | Page to get pdf from.                                                           |
| `size` | `"letter" \| "legal" \| "tabloid" \| "ledger" \| "a0" \| "a1" \| "a2" \| "a3" \| "a4" \| "a5" \| "a6" \|` | **[PaperFormat type \| Puppeteer](https://pptr.dev/api/puppeteer.paperformat)** |

Example request:

```json
{
    "url": "https://example.com",
    "size": "a4" // Replace with desired PDF format
}
```

This will return a **base64 encoded string** containing the requested PDF.

### Authentication

This API uses API keys for authentication. Include your application's API key in the request header. If you do not have an API key yet for your application, please reach out to project maintainer.

```
X-Api-Key: <your-api-key>
```

## 🚀 Project Structure

Inside of this 🧑‍🚀Astro project, you'll see the following folders and files:

```text
/
├── src/
│   ├── services/
│   │   └── *
│   ├── utils/
│   │   └── *
│   └── pages/
│       └── pdf/
|         └── api.ts
└── package.json
```

Each page is exposed as a route based on its file name.

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
