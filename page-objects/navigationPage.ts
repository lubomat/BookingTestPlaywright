import { Locator, Page } from '@playwright/test';

export class NavigationPage {
	readonly page: Page;
	readonly accomodationsMenu: Locator
    readonly cookieAcceptButton: Locator
    readonly SignInInfo: Locator

	constructor(page: Page) {
		this.page = page;
		this.accomodationsMenu = page.locator('#accommodations')
        this.cookieAcceptButton = page.getByRole('button', { name: 'Accept' })
        this.SignInInfo = page.getByRole('button', { name: 'Dismiss sign-in info.' })
	}

	async navigateToHomePage() {
		await this.page.goto('https://www.booking.com/');
	}

	async handleAllPopups() {
		if (await this.cookieAcceptButton.isVisible({timeout: 5000})) {
			await this.cookieAcceptButton.click();
            await this.cookieAcceptButton.waitFor({ state: 'hidden' })
		}
        if (await this.SignInInfo.isVisible({timeout: 5000})) {
            await this.SignInInfo.click()
            await this.SignInInfo.waitFor({ state: 'hidden' })
        }
	}

	async clickAccomodations() {
		await this.accomodationsMenu.click();
	}
}
