import { Locator, Page } from '@playwright/test'

export class SearchFormPage {
	readonly page: Page
	readonly destinationInput: Locator

	readonly occupancyButton: Locator
	readonly occupancyDoneButton: Locator
	//Adults
	readonly adultsMinusButton: Locator
	readonly adultsPlusButton: Locator
	readonly adultsValue: Locator
	//Childrens
	readonly childrenMinusButton: Locator
	readonly childrenPlusButton: Locator
	readonly childrenValue: Locator
	//Rooms
	readonly roomsMinusButton: Locator
	readonly roomsPlusButton: Locator
	readonly roomsValue: Locator

	readonly searchButton: Locator

	constructor(page: Page) {
		this.page = page;
		this.destinationInput = page.locator('input[name="ss"]');
		this.occupancyButton = page.locator(
			'button[data-testid="occupancy-config"]'
		);
		// Adults
		this.adultsMinusButton = page
			.locator('input#group_adults')
			.locator('..')
			.locator('button')
			.first();
		this.adultsPlusButton = page
			.locator('input#group_adults')
			.locator('..')
			.locator('button')
			.nth(1);
		this.adultsValue = page
			.locator('input#group_adults')
			.locator('..')
			.locator('span.e32aa465fd');
		// Childrens
		this.childrenMinusButton = page
			.locator('input#group_children')
			.locator('..')
			.locator('button')
			.first();
		this.childrenPlusButton = page
			.locator('input#group_children')
			.locator('..')
			.locator('button')
			.nth(1);
		this.childrenValue = page
			.locator('input#group_children')
			.locator('..')
			.locator('span.e32aa465fd')
		// Rooms
		this.roomsMinusButton = page
			.locator('input#no_rooms')
			.locator('..')
			.locator('button')
			.first();
		this.roomsPlusButton = page
			.locator('input#no_rooms')
			.locator('..')
			.locator('button')
			.nth(1);
		this.roomsValue = page
			.locator('input#no_rooms')
			.locator('..')
			.locator('span.e32aa465fd')
		this.occupancyDoneButton = page.locator('button:has-text("Done")')

		this.searchButton = page.getByRole('button', { name: 'Search' })
	}

	async enterDestination(destination: string) {
		await this.destinationInput.fill(destination);
	}

	/**
	 * Seting number of Adults and childrens.
	 * @param adults 
	 * @param children 
	 * @param rooms 
	 */
	async setGuests(adults: number, children: number, rooms: number) {
		await this.occupancyButton.click();

		// Set Adults
		let currentAdults = parseInt(
			(await this.adultsValue.textContent()) || '2',
			10
		);
		while (currentAdults > adults) {
			await this.adultsMinusButton.click();
			currentAdults--;
		}
		while (currentAdults < adults) {
			await this.adultsPlusButton.click();
			currentAdults++;
		}

		// Set Childrens
		let currentChildren = parseInt(
			(await this.childrenValue.textContent()) || '0',
			10
		);
		while (currentChildren > children) {
			await this.childrenMinusButton.click();
			currentChildren--;
		}
		while (currentChildren < children) {
			await this.childrenPlusButton.click();
			currentChildren++;
		}

		// Set Rooms
		let currentRooms = parseInt(
			(await this.roomsValue.textContent()) || '1',
			10
		);
		while (currentRooms > rooms) {
			await this.roomsMinusButton.click();
			currentRooms--;
		}
		while (currentRooms < rooms) {
			await this.roomsPlusButton.click();
			currentRooms++;
		}

		await this.occupancyDoneButton.click();
	}

	async clickSearchButton() {
		await this.searchButton.click();
	}
}
