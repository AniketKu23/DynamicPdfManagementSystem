type ProxyRequest = {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
};

type ProxyResponse = {
  setHeader: (key: string, value: string) => void;
  status: (code: number) => ProxyResponse;
  json: (body: unknown) => void;
  send: (body: Buffer) => void;
};

const apiBaseUrl = process.env.VITE_API_URL ?? process.env.BACKEND_API_URL;

export default async function handler(req: ProxyRequest, res: ProxyResponse) {
  if (!apiBaseUrl) {
    res.status(500).json({
      success: false,
      message: "Backend API URL is not configured. Set VITE_API_URL or BACKEND_API_URL in Vercel."
    });
    return;
  }

  const pathQuery = req.query?.path;
  const path = Array.isArray(pathQuery) ? pathQuery.join("/") : pathQuery ?? "";
  const target = `${apiBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: Object.fromEntries(
        Object.entries(req.headers)
          .filter(([key, value]) => key.toLowerCase() !== "host" && typeof value === "string")
          .map(([key, value]) => [key, value as string])
      ),
      body: ["GET", "HEAD"].includes(req.method ?? "GET") ? undefined : JSON.stringify(req.body)
    });

    response.headers.forEach((value, key) => {
      if (!["set-cookie", "content-encoding"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.status(response.status).send(buffer);
  } catch (error) {
    res.status(502).json({
      success: false,
      message: "Unable to reach backend API",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
