import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage';
import { SearchFormPage } from '../page-objects/searchFormPage';
import { CalendarPage } from '../page-objects/calendarPage'

test('Search hotels', async ({ page }) => {
	const navigation = new NavigationPage(page)
	const searchForm = new SearchFormPage(page)
	const calendar = new CalendarPage(page);

	await navigation.navigateToHomePage()

	await navigation.handleAllPopups()

	await navigation.clickAccomodations()
	await searchForm.enterDestination('Mediolan')

    await navigation.handleAllPopups()

    const fromOffset = 20
    const toOffset = 27

    const { checkin, checkout } = await calendar.selectDynamicDates(fromOffset, toOffset)
    const { checkinText, checkoutText } = await calendar.getDisplayedDates()

    const expectedCheckin = CalendarPage.formatDateForDisplay(checkin)
    const expectedCheckout = CalendarPage.formatDateForDisplay(checkout)

    await expect(checkinText).toBe(expectedCheckin)
    await expect(checkoutText).toBe(expectedCheckout)

    await searchForm.setGuests(4, 0, 2)

    await searchForm.clickSearchButton()

    await navigation.handleAllPopups()
    
});
