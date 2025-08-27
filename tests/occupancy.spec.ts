import { test, expect } from '@playwright/test';
import { OccupancyPage } from '../page-objects/occupancyPage';
import { NavigationPage } from '../page-objects/navigationPage';

test('Setting the numbers of adults, children and rooms', async ({ page }) => {
	const occupancy = new OccupancyPage(page);
	const navigation = new NavigationPage(page);

	await navigation.navigateToHomePage();
	await page.waitForTimeout(2000);
    await navigation.handleAllPopups();
	await occupancy.setGuests(3, 2, 2);

	const summary = await occupancy.getSummaryLabel();

	expect(summary).toContain('3 adults');
	expect(summary).toContain('2 children');
	expect(summary).toContain('2 rooms');
});
