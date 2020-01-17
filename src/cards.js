var FIELDNAMES = ['Emails'];

/**
 * Creates the main card users see with form inputs to log expense.
 * Form can be prefilled with values.
 *
 * @param {String[]} opt_prefills Default values for each input field.
 * @param {String} opt_status Optional status displayed at top of card.
 * @returns {Card}
 */
function createJiraCard(opt_prefills, opt_status) {
  var card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle('Lookup'));


  var formSection = createFormSection(CardService.newCardSection(),
                                      FIELDNAMES, opt_prefills);

  card.addSection(formSection);


  Logger.log(opt_prefills);

  var issues = [];
  issues = jiraConnection(opt_prefills[0])

  Logger.log(issues);

  if (issues.length > 0) {
    for (var i = 0; i < issues.length; i++) {
      var results_section = CardService.newCardSection()
        .addWidget(CardService.newKeyValue()
          .setTopLabel(issues[i][0])
          .setContent(issues[i][1]).setOpenLink(CardService.newOpenLink()
            .setUrl("https://3one4capital.atlassian.net/browse/"+issues[i][0])
            .setOpenAs(CardService.OpenAs.FULL_SIZE)
            .setOnClose(CardService.OnClose.NOTHING)))
      card.addSection(results_section);
    }
  }

  return card;
}

/**
 * Creates form section to be displayed on card.
 *
 * @param {CardSection} section The card section to which form items are added.
 * @param {String[]} inputNames Names of titles for each input field.
 * @param {String[]} opt_prefills Default values for each input field.
 * @returns {CardSection}
 */
function createFormSection(section, inputNames, opt_prefills) {
  for (var i = 0; i < inputNames.length; i++) {
    var widget = CardService.newTextInput()
      .setFieldName(inputNames[i])
      .setTitle(inputNames[i]);
    if (opt_prefills && opt_prefills[i]) {
      widget.setValue(opt_prefills[i]);
    }
    section.addWidget(widget);
  }

  /*
  var submitForm = CardService.newAction().setFunctionName('submitForm');
  var submitButton = CardService.newTextButton()
  .setText('Submit')
  .setOnClickAction(submitForm);
  section.addWidget(CardService.newButtonSet().addButton(submitButton));
  */

  return section;
}

function submitForm(e) {
  jiraConnection();
}
