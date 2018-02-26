import { NtbPage } from './app.po';

describe('ntb App', () => {
  let page: NtbPage;

  beforeEach(() => {
    page = new NtbPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ntb!');
  });
});
