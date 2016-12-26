import { GelatoItalianoPage } from './app.po';

describe('gelato-italiano App', function() {
  let page: GelatoItalianoPage;

  beforeEach(() => {
    page = new GelatoItalianoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gi works!');
  });
});
