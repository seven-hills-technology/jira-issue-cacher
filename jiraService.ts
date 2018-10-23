import axiosStatic from "axios";

import { config } from "./config"
import { JiraIssue } from "./models/jiraIssue";
import { JiraProject } from "./models/jiraProject";

const axios = axiosStatic.create({baseURL: config.jiraApiBaseUrl});

axios.interceptors.request.use(axiosConfig => {
    axiosConfig.headers.Authorization = config.jiraApiAuthHeaderValue;
    axiosConfig.headers.Accept = "application/json";
    return axiosConfig;
})

class JiraService {
    async getAllJiraProjects(): Promise<JiraProject[]> {
        const res = await axios.get<JiraProject[]>(`project`);
        return res.data;
    }

    async getAllJiraIssues(): Promise<JiraIssue[]> {
        const maxResults = 100;
        let allResults: JiraIssue[] = [];
        let resultsBatch: JiraIssue[] = null;

        for (let startAt = 0; resultsBatch == null || resultsBatch.length == maxResults; startAt += maxResults) {
            console.log(startAt);
            const res = await axios.get<any>(`search?startAt=${startAt}&maxResults=${maxResults}`);
            resultsBatch = res.data.issues;
            allResults = [...allResults, ...resultsBatch];
        }

        return allResults;
    }

    async *getAllJiraIssuesGenerator() : AsyncIterableIterator<JiraIssue> {
        const maxResults = 100;
        let resultsBatch: JiraIssue[] = null;

        for (let startAt = 0; resultsBatch == null || resultsBatch.length == maxResults; startAt += maxResults) {
            console.log(startAt);
            const res = await axios.get<any>(`search?startAt=${startAt}&maxResults=${maxResults}`);
            resultsBatch = res.data.issues;
            for (const jiraIssue of resultsBatch) {
                yield jiraIssue;
            }
        }
    }
}

export const jiraService = new JiraService();