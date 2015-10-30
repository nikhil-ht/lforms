dp = require('./demopage.po.js');
describe('508', function() {

  describe('screen reader log', function() {

    it('should be empty when the form loads', function() {
      // This is not so much a requirement as a precondition
      // for subsequent tests.
      dp.openUSSGFHTHorizontal();
      expect(dp.readerLogEntries.getText()).toEqual([]);
    });
    it('should contain an entry when skip logic shows a field', function() {
      dp.heightField.sendKeys('10');
      expect(dp.readerLogEntries.getText()).toEqual(
        ['Showing Mock-up item: Shown when Height >= 10']);
    });
    it('should not add an extra entry if the field is already showing',
       function() {
      dp.heightField.sendKeys('2');
      expect(dp.readerLogEntries.getText()).toEqual(
        ['Showing Mock-up item: Shown when Height >= 10']);
    });
    it('should contain an entry when skip logic hides a field', function() {
      dp.heightField.sendKeys(protractor.Key.BACK_SPACE);
      dp.heightField.sendKeys(protractor.Key.BACK_SPACE);
      expect(dp.readerLogEntries.getText()).toEqual(
        ['Showing Mock-up item: Shown when Height >= 10',
         'Hiding Mock-up item: Shown when Height >= 10']);
    });
    it('should not add an extra entry if the field is already hidden',
       function() {
      dp.heightField.sendKeys(protractor.Key.BACK_SPACE);
      expect(dp.readerLogEntries.getText()).toEqual(
        ['Showing Mock-up item: Shown when Height >= 10',
         'Hiding Mock-up item: Shown when Height >= 10']);
    });
    it('should add an entry when a section is added or removed', function () {
      // Reset the reader log
      dp.resetReaderLog();
      expect(dp.readerLogEntries.getText()).toEqual([]);
      // Add a section
      element(by.id('add-/54126-8/54137-5/1/1')).click();  // Add another 'Your Diseases History'
      expect(dp.readerLogEntries.getText()).toEqual(['Added section']);
      // Remove the section
      var minusButtonCSS = "button[title=\"Remove this 'Your diseases history'\"]";
      element.all(by.css(minusButtonCSS)).first().click();
      expect(dp.readerLogEntries.getText()).toEqual(['Added section', 'Removed section']);
    });
    it('should add an entry when a row is added or removed', function () {
      // Reset the reader log
      dp.resetReaderLog();
      expect(dp.readerLogEntries.getText()).toEqual([]);
      // Add a row.  Currently both the + button and the "add another" button have
      // the same element ID, so we use the first one.
      element.all(by.id('add-/54114-4/54117-7/1/1')).first().click();  // The + button on the table
      expect(dp.readerLogEntries.getText()).toEqual(['Added row']);
      // Remove the row
      var minusButtonCSS =
        "button[title=\"Remove this row of 'This family member's history of disease'\"]";
      element.all(by.css(minusButtonCSS)).first().click();
      expect(dp.readerLogEntries.getText()).toEqual(['Added row', 'Removed row']);
    });
    it('should add an entry when a question is added or removed', function () {
      // Switch to the first form, which has a repeating question
      dp.openUSSGFHTVertical();
      var addNameCSS = "button[title=\"Add another 'Name'\"]";
      var addNameButton = element(by.css(addNameCSS));
      browser.wait(function() {
        return addNameButton.isPresent();
      }, 10000);
      // Reset the reader log
      dp.resetReaderLog();
      expect(dp.readerLogEntries.getText()).toEqual([]);
      // Add a question
      addNameButton.click();
      expect(dp.readerLogEntries.getText()).toEqual(['Added question']);
      // Remove the question
      element.all(by.css("button[title=\"Remove this 'Name'\"]")).first().click();
      expect(dp.readerLogEntries.getText()).toEqual(['Added question', 'Removed question']);
    });
  });

  /* This section is not about the screen reader log, but about things needed to
   * assist the screen reader.*/
  describe('field labels', function() {
    it('should be present on the questions in the vertical template', function() {
      dp.openUSSGFHTVertical();
      expect(dp.heightLabel.isPresent()).toBeTruthy();
    });
    it('should be present on the questions in the horizontal template', function() {
      dp.openUSSGFHTHorizontal();
      expect(dp.heightLabel.isPresent()).toBeTruthy();
    });
    it('should be present on the questions in the directive test', function() {
      // This is to test lforms.tpl.js.
      dp.openDirectiveTest();
      expect(dp.heightLabel.isPresent()).toBeTruthy();
    });
  });
});
