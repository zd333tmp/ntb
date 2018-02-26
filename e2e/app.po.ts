import { browser, by, element } from 'protractor';

export class NtbPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ntb-root h1')).getText();
  }
}
