import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

// https://api.pingdom.com/api/3.1/summary.average/5687834?includeuptime=true&from=1701784111

async function pingdomUptime(id: string) {
  const url = "https://api.pingdom.com/api/3.1/summary.average"
  
  // create a new date and subtract 30 days
  const date = new Date()
  date.setDate(date.getDate() - 30)
  const from = Math.floor(date.getTime() / 1000)
  const now = Math.floor(new Date().getTime() / 1000)

  return fetch(`${url}/${id}?includeuptime=true&from=${from}&to=${now}`, 
    {
      headers: {
        Authorization: `Bearer ${process.env.PINGDOM_API_KEY}`,
      },
      next: { revalidate: 36000 }
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