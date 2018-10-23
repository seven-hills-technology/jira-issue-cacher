import "./asyncIteratorShim";

import * as redis from "redis";
import {promisify} from "util";

import { jiraService } from './jiraService';

const redisClient = redis.createClient();

const asyncRedisClient = {
    get: promisify(redisClient.get).bind(redisClient),
    set: promisify(redisClient.set).bind(redisClient),
    del: promisify(redisClient.del).bind(redisClient),
    sadd: promisify(redisClient.sadd).bind(redisClient),
    srem: promisify(redisClient.srem).bind(redisClient),
    setnx: promisify(redisClient.setnx).bind(redisClient),
    srandmember: promisify(redisClient.srandmember).bind(redisClient)
};

async function loopThroughJiraIssues() {
    for await (const jiraIssue of jiraService.getAllJiraIssuesGenerator()) {
        const key = jiraIssue.key;
        const project = jiraIssue.fields.project.name;
        const summary = jiraIssue.fields.summary;
        const jsonString = JSON.stringify({key, project, summary});
        await asyncRedisClient.set(`jira-issue-cache:jiraIssues:${key}`, jsonString);
    }
}

function run() {
    loopThroughJiraIssues()
        .then(() => {
            setImmediate(run);
        })
}

run();