export default async function handler(req: any, res: any) {
	const { url } = req.query;

	if (!url || typeof url !== "string") {
		return res.status(400).json({ error: "Missing url parameter" });
	}

	try {
		new URL(url);
	} catch {
		return res.status(400).json({ error: "Invalid URL" });
	}

	try {
		const response = await fetch(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (compatible; PersonalCMS/1.0; +https://github.com)",
				Accept: "text/html,application/xhtml+xml",
			},
			signal: AbortSignal.timeout(10000),
		});
		const html = await response.text();
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.send(html);
	} catch (error: any) {
		res.status(500).json({ error: error.message ?? "Failed to fetch URL" });
	}
}
