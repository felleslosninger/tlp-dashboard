import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function getRes(url: string): Promise<string> {
  const response = await fetch(url, {
    cache: "no-cache",
  });

  const body = await new Response(response.body, {
    headers: { "Content-Type": "text/html" },
  }).text();

  return body.split(" ")[9];
}

async function getDiff(url: string): Promise<number> {
  const response = await getRes(url)
    .then(async (res) => {
      const res1 = res;
      let res2: string;
      return await delay(1000)
        .then(async () => {
          res2 = await getRes(url);
        })
        .then(() => {
          return parseInt(res2) - parseInt(res1);
        });
    })
    .catch(() => {
      return 0;
    });

  return response;
}

export async function GET(
  req: any,
) {
  const url = req.url?.split('?')[1].split('=')[1]

  const diff = await getDiff(url || "")

  return NextResponse.json(diff)
}