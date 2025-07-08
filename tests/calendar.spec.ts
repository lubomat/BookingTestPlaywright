import { test, expect } from '@playwright/test';
import { CalendarPage } from '../page-objects/calendarPage';
import { NavigationPage } from '../page-objects/navigationPage';

test('Calendar allows selecting dynamic date range', async ({ page }) => {
	const calendar = new CalendarPage(page);
	const navigation = new NavigationPage(page);

	await navigation.navigateToHomePage();

	const fromOffset = 20,
		toOffset = 27;
	const { checkin, checkout } = await calendar.selectDynamicDates(
		fromOffset,
		toOffset
	);
	const { checkinText, checkoutText } = await calendar.getDisplayedDates();

	await page.locator('body').click({ position: { x: 0, y: 0 } });
	await navigation.handleAllPopups();

	const expectedCheckin = CalendarPage.formatDateForDisplay(checkin);
	const expectedCheckout = CalendarPage.formatDateForDisplay(checkout);

	await expect(checkinText).toBe(expectedCheckin);
	await expect(checkoutText).toBe(expectedCheckout);
});
