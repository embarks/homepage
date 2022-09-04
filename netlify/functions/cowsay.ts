import { Handler } from "@netlify/functions";
import { say } from "cowsay";

const handler: Handler = async (event, context) => {
  // your server-side functionality
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: say({ text: "mo0ooOoo00ooooo00" }),
    }),
  }
};

export { handler };
