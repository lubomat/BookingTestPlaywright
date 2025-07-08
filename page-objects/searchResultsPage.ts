import { Locator, Page } from '@playwright/test'

export class SearchResultsPage {
    readonly page: Page
    readonly hotels: Locator

    constructor(page: Page) {
        this.page = page
        this.hotels = page.locator('[data-testid="property-card"][role="listitem"]')
    
    }

    async getHotelsCount(): Promise<number> {
        return this.hotels.count()
    }
}