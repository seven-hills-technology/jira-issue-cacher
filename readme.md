# jira-issue-cacher
A small node service that continuously retrieves issues from jira's api and updates a local Redis cache
## Prerequisites
This application requires:
* A modern version of node (v8.3.x or higher)
* yarn package manager
* Redis
## Generating jira api key
* Go to https://id.atlassian.com/manage/api-tokens
* Add api token
* Generate a base 64 hash of "${jira_email}:${api_token}"
## Running
### Development build:
```
JIRA_API_BASE_URL=https://${org_specific_jira_subdomain}.atlassian.net/rest/api/3 JIRA_API_AUTH_HEADER_VALUE=${base64_encoded_jira_key} yarn start
```
### Adding as a startup script on MacOS:
Add the following file to ~/Library/LaunchAgents/com.sevenhillstechnology.jira-issue-cacher.plist:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.sevenhillstechnology.jira-issue-cacher</string>
    <key>WorkingDirectory</key>
    <string>/Users/sprice/Code/jira-issue-cacher</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>JIRA_API_AUTH_HEADER_VALUE</key>
        <string>Basic ${base_64_encoded_jira_key}</string>
        <key>JIRA_API_BASE_URL</key>
        <string>https://${org_specific_jira_subdomain}.atlassian.net/rest/api/3</string>
    </dict>
    <key>ProgramArguments</key>
    <array>
       <string>/usr/local/bin/node</string>
       <string>/usr/local/bin/ts-node</string>
       <string>${location_of_jira-issue-cacher}/index.ts</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>/dev/null</string>
    <key>StandardOutPath</key>
    <string>/dev/null</string>
  </dict>
</plist>
```