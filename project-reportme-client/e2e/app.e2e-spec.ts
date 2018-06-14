import { ProjectTimesheetClientPage } from './app.po';

describe('project-timesheet-client App', () => {
  let page: ProjectTimesheetClientPage;

  beforeEach(() => {
    page = new ProjectTimesheetClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
