function getEmails(message) {
  var emails = message.getTo().replace(/^.+<([^>]+)>$/, "$1").split(',').concat(message.getFrom().replace(/^.+<([^>]+)>$/, "$1").split(',')).concat(message.getCc().replace(/^.+<([^>]+)>$/, "$1").split(','));

  Logger.log(message.getCc()); // Log cc'd addresses
  var uniqueDomains = getDomains(emails).filter(function(item, pos, self) {
    return item !== '3one4capital' && item !== 'gmail' && self.indexOf(item) === pos;
  })
  return uniqueDomains.join(', ');
}

function emailArray(e) {
  return e.split(',').map(function(x) {return x.trim()})
}

function getDomains(emails) {
  return emails.map(function(email) {
    return email.split('@')[1].split('.')[0];
  })
}

function jiraConnection(company)
{
  if (!company || company.length === 0)
    return [];

  var options = {
    'method' : 'get',
    'contentType': 'application/json',
    'muteHttpExceptions': true,
    'headers': {
      'Authorization': 'Basic c29uYWxAM29uZTRjYXBpdGFsLmNvbTpJNXhucFpLWTZHYzRRdjU1YjdrMDk2MTc=',
      'Content-Type': 'application/json'
    }
  };
  var httpResponse = UrlFetchApp.fetch('https://3one4capital.atlassian.net/rest/api/2/search?jql=' + encodeURIComponent('text ~ ' + company), options);
  if (httpResponse) {

    var rspns = httpResponse.getResponseCode();
    Logger.log({response_code: rspns})
    switch(rspns){
      case 200:
        var data = JSON.parse(httpResponse.getContentText());
        var i_list = [];

        for(var id in data["issues"])
        {
          // Check the data is valid and the Jira fields exist
          if(data["issues"][id] && data["issues"][id].fields) {
            var key = data["issues"][id].key;
            var summary = data["issues"][id].fields.summary;

            i_list.push([key,summary]);
          }
        }
        Logger.log(i_list);
        return i_list;
      case 404:
        console.log("Response error, No item found")
        break;
      default:
        var data = JSON.parse(httpResponse.getContentText());
        console.error("Error: "+ data.errorMessages.join(","));
        break;
    }
  }
  else {
    console.error("Jira Error","Unable to make requests to Jira!", Browser.Buttons.OK);
  }
}
