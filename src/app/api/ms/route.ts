import { Client } from "@microsoft/microsoft-graph-client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

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

export async function GET(req: any) {
  const token = await getAccessToken();

  const user = await getUserProfile(token);

  return NextResponse.json(user.value);
}

export async function getUserProfile(token: string) {
  const client = Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });

  try {
    const user = await client.api("/communications/getPresencesByUserId").post({
      ids: [
        "ef90ae43-468e-4d15-b81c-ad927a1db4e1",
        "e6a4123a-e64a-455c-a0f6-24f3ad0b1f24",
        "4471e6e8-cbea-42a3-986a-ff9cd2ea20d4",
        "65ab5cbd-12da-4eb6-8982-28278078a1f4",
        "bf4f8d5e-8a8a-4ded-9407-00d2b4d094e9",
      ],
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}
