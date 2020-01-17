function getContextualAddOn(event) {
  const message = getCurrentMessage(event);
  const prefills = [getEmails(message)];
  const card = createJiraCard(prefills);

  return [card.build()];
}

/**
 * Retrieves the current message given an action event object.
 * @param {Event} event Action event object
 * @return {Message}
 */
function getCurrentMessage(event) {
  const { accessToken } = event.messageMetadata;
  const { messageId } = event.messageMetadata;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  return GmailApp.getMessageById(messageId);
}
