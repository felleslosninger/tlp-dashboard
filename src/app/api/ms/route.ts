import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getUserProfile } from "@/helpers/getUserProfile";

interface AccessParams {
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope: string;
}

async function getAccessToken() {
  const access: AccessParams = {
    client_id: process.env.MS_CLIENT_ID || "",
    client_secret: process.env.MS_CLIENT_SECRET || "",
    grant_type: "client_credentials",
    scope: "https://graph.microsoft.com/.default",
  };

  let formBody = [];
  let body = "";
  for (let property in access) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(
      access[property as keyof AccessParams]
    );
    formBody.push(encodedKey + "=" + encodedValue);
  }
  body = formBody.join("&");

  const response = await fetch(
    "https://login.microsoftonline.com/008e560f-08af-4cec-a056-b35447503991/oauth2/v2.0/token?" +
      body,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
      next: { revalidate: 3000 },
    }
  );

  const resBody = await new Response(response.body).text();

  return JSON.parse(resBody).access_token;
}

export async function GET() {
  const token = await getAccessToken();

  const user = await getUserProfile(token);

  return NextResponse.json(user.value);
}
