import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';
import Papa from 'papaparse';

async function run() {
  try {
    const token = core.getInput('token', { required: true });
    const entName = core.getInput('ent_name', { required: true });
    const filePath = core.getInput('file_path', { required: true });

    const octokit = github.getOctokit(token);

    const apiUrl = `https://api.github.com/enterprises/${entName}/copilot/billing/seats`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const csv = Papa.unparse(response.data);
    const fs = require('fs');
    fs.writeFileSync(filePath, csv);

    core.setOutput('csv_path', filePath);
    console.log(`CSV generated at: ${filePath}`);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
