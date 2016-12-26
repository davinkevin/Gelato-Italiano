import { browser, element, by } from 'protractor';

export class GelatoItalianoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gi-root h1')).getText();
  }
}
