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
	 * Wybiera zakres dat: checkin = dziś + fromOffset, checkout = dziś + toOffset
	 * Przykład: selectDynamicDates(20, 27) – pobyt od za 20 dni do za 27 dni (7 dni)
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
	 * Zwraca tekst wyświetlanych dat zameldowania i wymeldowania (np. "20 lipca 2025")
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
	 * Pomocnicza metoda do formatowania daty zgodnie z formatem Booking.com
	 */
	static formatDateForDisplay(date: Date): string {
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		});
	}
}
