import { Locator, Page } from '@playwright/test';

export class CalendarPage {
	readonly page: Page;
	readonly calendarButton: Locator;
	readonly checkinDisplay: Locator;
	readonly checkoutDisplay: Locator;

	constructor(page: Page) {
		this.page = page;
		this.calendarButton = page.locator(
			'button[data-testid="searchbox-dates-container"]'
		);
		this.checkinDisplay = page.locator(
			'[data-testid="date-display-field-start"]'
		);
		this.checkoutDisplay = page.locator(
			'[data-testid="date-display-field-end"]'
		);
	}

	async openCalendar() {
		await this.calendarButton.click();
	}

	/**
	 * Selects date range: checkin = today + fromOffset, checkout = today + toOffset
	 * Example: selectDynamicDates(20, 27) – stay from 20 days to 27 days (7 days)
	 */
	async selectDynamicDates(fromOffset: number, toOffset: number) {
		const today = new Date();
		const checkin = new Date(today);
		checkin.setDate(today.getDate() + fromOffset);
		const checkout = new Date(today);
		checkout.setDate(today.getDate() + toOffset);

		const checkinStr = checkin.toISOString().split('T')[0];
		const checkoutStr = checkout.toISOString().split('T')[0];

		await this.openCalendar();
		await this.page.locator(`[data-date="${checkinStr}"]`).click();
		await this.page.locator(`[data-date="${checkoutStr}"]`).click();

		return { checkin, checkout };
	}

	/**
	 * Returns the text of the displayed check-in and check-out dates (e.g. "July 20, 2025")
	 */
	async getDisplayedDates(): Promise<{
		checkinText: string;
		checkoutText: string;
	}> {
		const checkinText = await this.checkinDisplay.textContent();
		const checkoutText = await this.checkoutDisplay.textContent();
		return {
			checkinText: checkinText?.trim() ?? '',
			checkoutText: checkoutText?.trim() ?? '',
		};
	}

	/**
	 * Helping method to format the date according to the Booking.com format
	 */
	static formatDateForDisplay(date: Date): string {
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		});
	}
}
