import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function getRes(): Promise<string> {
  const response = await fetch(
    "https://www.digdir.no/api/content/node/news?filter[status]=1&page[limit]=3&sort=-created",
    {
      cache: "no-cache",
    }
  );

  const body = await new Response(response.body, {
    headers: { "Content-Type": "text/html" },
  }).text();

  return JSON.parse(body);
}

export async function GET(req: any) {
  const news = await getRes();
  return NextResponse.json(news);
}
