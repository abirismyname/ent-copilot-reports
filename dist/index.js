"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github = require("@actions/github");
const axios_1 = require("axios");
const papaparse_1 = require("papaparse");
async function run() {
    try {
        const token = core.getInput('token', { required: true });
        const entName = core.getInput('ent_name', { required: true });
        const filePath = core.getInput('file_path', { required: true });
        const octokit = github.getOctokit(token);
        const apiUrl = `https://api.github.com/enterprises/${entName}/copilot/billing/seats`;
        const response = await axios_1.default.get(apiUrl, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        const csv = papaparse_1.default.unparse(response.data);
        const fs = require('fs');
        fs.writeFileSync(filePath, csv);
        core.setOutput('csv_path', filePath);
        console.log(`CSV generated at: ${filePath}`);
    }
    catch (error) {
        core.setFailed(`Action failed with error: ${error}`);
    }
}
run();
