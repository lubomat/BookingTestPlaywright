import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { SearchFormPage } from '../page-objects/searchFormPage';
import { CalendarPage } from '../page-objects/calendarPage';
import { SearchResultsPage } from '../page-objects/searchResultsPage';
import { OccupancyPage } from '../page-objects/occupancyPage';

test('Search hotels', async ({ page }) => {
	const navigation = new NavigationPage(page);
	const searchForm = new SearchFormPage(page);
	const calendar = new CalendarPage(page);
	const occupancy = new OccupancyPage(page);
	const results = new SearchResultsPage(page);

	await navigation.navigateToHomePage();
	await navigation.handleAllPopups();
	await navigation.clickAccomodations();
	await searchForm.enterDestination('Milan');
	await navigation.handleAllPopups();
	await calendar.selectDynamicDates(20, 27);
	await occupancy.setGuests(4, 0, 2);
	await searchForm.clickSearchButton();

	await expect(results.hotels.first()).toBeVisible();
	const hotelsCount = await results.getHotelsCount();
	console.log('Number of hotels: ' + hotelsCount);

});
