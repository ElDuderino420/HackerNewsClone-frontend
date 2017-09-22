import { HackerNewsCloneFrontendPage } from './app.po';

describe('hacker-news-clone-frontend App', function() {
  let page: HackerNewsCloneFrontendPage;

  beforeEach(() => {
    page = new HackerNewsCloneFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
