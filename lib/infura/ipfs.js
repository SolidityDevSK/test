import { create } from "kubo-rpc-client";

const PROJECT_ID = "2GajDLTC6y04qsYsoDRq9nGmWwK";
const PROJECT_SECRET = "48c62c6b3f82d2ecfa2cbe4c90f97037";
const PROJECT_ID_SECRECT = `${PROJECT_ID}:${PROJECT_SECRET}`;

export const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    Authorization: `Basic ${Buffer.from(PROJECT_ID_SECRECT).toString("base64")}`,
  },
});


export async function getNFTMetadataFromIPFS(hash) {
    try {
      const response = await ipfsClient.get("QmWGBPvsV3oJQ1EHwJfJvGMAp4djdnnZ1r4Rxz8DjsJTjH");
  
      // Log response to see available methods
      console.log(response);
  
      // Choose the appropriate method based on the response type
      const content = response.text ? await response.text() : await response.arrayBuffer();
      const trimmedContent = content.trim();
  
      // Find the start and end index of the JSON object
      const startIndex = trimmedContent.indexOf("{");
      const endIndex = trimmedContent.lastIndexOf("}") + 1;
  
      // Extract the JSON object string
      const jsonObjectString = trimmedContent.slice(startIndex, endIndex);
  
      try {
        const jsonObject = JSON.parse(jsonObjectString);
        return jsonObject;
      } catch (error) {
        console.log("Error parsing JSON:", error);
        return undefined;
      }
    } catch (error) {
      console.log("Error fetching content from IPFS:", error);
      return undefined;
    }
  }
  
  
  