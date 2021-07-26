echo "Logging into Salesforce Org"
mkdir keys
echo $SFDC_SERVER_KEY | base64 -di > keys/server.key

echo "Authenticating org"
sfdx force:auth:jwt:grant --clientid $APP_KEY --jwtkeyfile keys/server.key --username $SF_USERNAME --instanceurl 	https://creative-goat-9jgax0-dev-ed.my.salesforce.com 