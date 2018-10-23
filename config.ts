const jiraUsername = "seanprice@sevenhillstechnology.com";
const jiraApiKey = "5YBRbslcdecIOMToifDZ52A5";
const jiraBase64Auth = Buffer.from(`${jiraUsername}:${jiraApiKey}`).toString("base64");
const jiraAuthHeaderValue = `Basic ${jiraBase64Auth}`;

export const config = {
    jiraApiBaseUrl: process.env.JIRA_API_BASE_URL || "https://sevenhillstechnology.atlassian.net/rest/api/3",
    jiraApiAuthHeaderValue: process.env.JIRA_API_AUTH_HEADER_VALUE || jiraAuthHeaderValue
};