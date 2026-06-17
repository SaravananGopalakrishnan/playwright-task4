import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testJira() {
  try {
    const auth = Buffer.from(
      `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
    ).toString("base64");

    const response = await axios.get(
      `${process.env.JIRA_BASE_URL}/rest/api/3/project/${process.env.JIRA_PROJECT_KEY}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
      }
    );

    console.log("Connected Successfully");
    console.log(response.data.key);
    console.log(response.data.name);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
  }
}

testJira();