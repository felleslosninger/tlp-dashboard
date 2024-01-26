import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

// https://api.pingdom.com/api/3.1/results/5687834?from=1701784111&limit=1

async function pingdomUptime(id: string) {
  const url = "https://api.pingdom.com/api/3.1/results"
  
  // create a new date and subtract 30 days
  const date = new Date()
  date.setDate(date.getDate() - 30)
  const from = Math.floor(date.getTime() / 1000)

  return fetch(`${url}/${id}?includeuptime=true&from=${from}&limit=1`, 
    {
      headers: {
        Authorization: `Bearer ${process.env.PINGDOM_API_KEY}`,
      },
      cache: "no-cache"
    }
  )
}

export async function GET(
  req: any
) {

  const id = req.url?.split('?')[1].split('=')[1]

  const response = await pingdomUptime(id || "")

  const body = await new Response(response.body).text();

  return NextResponse.json(body)
}