import { Locator, Page } from '@playwright/test';

export class SearchFormPage {
  readonly page: Page;
  readonly destinationInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.destinationInput = page.locator('input[name="ss"]');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async enterDestination(destination: string) {
    await this.destinationInput.fill(destination);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }
}
