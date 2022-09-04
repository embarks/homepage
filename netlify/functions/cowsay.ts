import { Handler } from "@netlify/functions";
import cowsay from "cowsayjs";

const handler: Handler = async (event, context) => {
  // your server-side functionality
  return {
    headers: {
      // allow to request the api from the local dev server on port 8080
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify({
      message: cowsay.moo("moooo00OOOOOOOOooooo..."),
    }),
  }
};

export { handler };
