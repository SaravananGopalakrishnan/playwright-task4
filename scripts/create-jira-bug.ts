import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function createJiraBug(
  testName: string,
  errorMessage: string
): Promise<string> {
  try {
    const auth = Buffer.from(
      `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
    ).toString("base64");

    const response = await axios.post(
      `${process.env.JIRA_BASE_URL}/rest/api/3/issue`,
      {
        fields: {
          project: {
            key: process.env.JIRA_PROJECT_KEY,
          },

          summary: `Automation Failure - ${testName}`,

          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: `Test Failed: ${testName}`,
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: `Error: ${errorMessage}`,
                    type: "text",
                  },
                ],
              },
            ],
          },

          issuetype: {
            name: "Task",
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const issueKey = response.data.key;

    console.log("Jira Bug Created Successfully");
    console.log("Issue Key:", issueKey);

    return issueKey;
  } catch (error: any) {
    console.log(
      JSON.stringify(error.response?.data, null, 2)
    );

    return "JIRA_CREATION_FAILED";
  }
}