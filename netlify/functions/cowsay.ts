import { Handler } from "@netlify/functions";
import cowsay from "cowsayjs";

const handler: Handler = async (event, context) => {
  // your server-side functionality
  return {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080/", 
    },
    statusCode: 200,
    body: JSON.stringify({
      message: cowsay.moo("moooo00OOOOOOOOooooo..."),
    }),
  }
};

export { handler };
