import { Handler } from "@netlify/functions";
import cowsay from "cowsayjs";

const handler: Handler = async (event, context) => {
  // your server-side functionality
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: cowsay.moo("moooo00OOOOOOOOooooo..."),
    }),
  }
};

export { handler };
