function getContextualAddOn(event) {
  var message = getCurrentMessage(event);
  var prefills = [getEmails(message)];
  var card = createJiraCard(prefills);

  return [card.build()];
}

/**
 * Retrieves the current message given an action event object.
 * @param {Event} event Action event object
 * @return {Message}
 */
function getCurrentMessage(event) {
  var accessToken = event.messageMetadata.accessToken;
  var messageId = event.messageMetadata.messageId;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  return GmailApp.getMessageById(messageId);
}
