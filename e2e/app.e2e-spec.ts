import { MeetingPlannerPage } from './app.po';

describe('meeting-planner App', function() {
  let page: MeetingPlannerPage;

  beforeEach(() => {
    page = new MeetingPlannerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
