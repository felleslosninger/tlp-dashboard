//const Client = require("@microsoft/microsoft-graph-client");
/*import { Client } from "@microsoft/microsoft-graph-client";

const client = Client.init({
  authProvider: (done) => {
    done(null, process.env.MS_CLIENT_ID, process.env.MS_CLIENT_SECRET);
  },
});

export default async function getUserProfile() {
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
*/
