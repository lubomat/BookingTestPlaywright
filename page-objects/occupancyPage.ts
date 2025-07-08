import { Locator, Page } from '@playwright/test';

export class OccupancyPage {
	readonly page: Page;
	readonly occupancyButton: Locator;
	readonly occupancyDoneButton: Locator;
	// Adults
	readonly adultsMinusButton: Locator;
	readonly adultsPlusButton: Locator;
	readonly adultsValue: Locator;
	// Childrens
	readonly childrenMinusButton: Locator;
	readonly childrenPlusButton: Locator;
	readonly childrenValue: Locator;
	// Rooms
	readonly roomsMinusButton: Locator;
	readonly roomsPlusButton: Locator;
	readonly roomsValue: Locator;

	constructor(page: Page) {
		this.page = page;
		this.occupancyButton = page.locator(
			'button[data-testid="occupancy-config"]'
		);
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
			.locator('span.e32aa465fd');
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
			.locator('span.e32aa465fd');
		this.occupancyDoneButton = page.locator('button:has-text("Done")');
	}

    /**
	 * Seting number of Adults and childrens.
	 * @param adults 
	 * @param children 
	 * @param rooms 
	 */

	async setGuests(adults: number, children: number, rooms: number) {
		await this.occupancyButton.click();

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

	async getGuests(): Promise<{
		adults: number;
		children: number;
		rooms: number;
	}> {
		return {
			adults: parseInt((await this.adultsValue.textContent()) || '2', 10),
			children: parseInt((await this.childrenValue.textContent()) || '0', 10),
			rooms: parseInt((await this.roomsValue.textContent()) || '1', 10),
		};
	}

    async getSummaryLabel(): Promise<string> {
    return (await this.occupancyButton.getAttribute('aria-label')) ?? '';
  }
}
