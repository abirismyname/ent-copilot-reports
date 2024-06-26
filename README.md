# ent-copilot-reports

This GitHub Action generates a CSV report from GitHub API data, designed for use with GitHub Enterprise. It's a TypeScript-based action that can be used to automate the generation of reports from API data and is available on the GitHub Marketplace.

## Inputs

- `token`: GitHub token for authentication. (required)
- `ent_name`: Name of the enterprise. (required)
- `file_path`: File path for the generated CSV. (required)

## Outputs

- `csv_path`: Full path to the generated CSV file.

## Usage

To use this action in your workflow, add the following step:

```yaml
- name: Generate CSV Report
  uses: abirismyname/ent-copilot-reports@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    ent_name: 'your-enterprise-name'
    file_path: 'path/to/your/report.csv'
```

This will generate a CSV report at the specified file path, using the provided GitHub token for authentication and targeting the specified enterprise.
