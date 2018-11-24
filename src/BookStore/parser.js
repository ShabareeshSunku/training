export function parseBooks(items = []) {
    let itemLen = items.length
    let parsedItems = []
    for (let i = 0; i < itemLen; i++) {
        let item = items[i] || {}
        let parsedItem = parseBook(item)
        parsedItems.push(parsedItem)
    }
    return parsedItems
}

export function parseBook(item = {}) {
    return {
        title: item.volumeInfo && item.volumeInfo.title || '',
        subtitle: item.volumeInfo && item.volumeInfo.subtitle || '',
        description: item.volumeInfo && item.volumeInfo.description || '',
        authors: item.volumeInfo && item.volumeInfo.authors || [],
        rating: item.volumeInfo && item.volumeInfo.averageRating || 0,
        count: item.volumeInfo && item.volumeInfo.ratingsCount || 0,
        thumbnail: item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail || '',
        price: item.saleInfo && item.saleInfo.retailPrice && parseInt(item.saleInfo.retailPrice.amount) || '',
        listPrice: item.saleInfo && item.saleInfo.listPrice && parseInt(item.saleInfo.listPrice.amount) || '',
        buyLink: item.saleInfo && item.saleInfo.buyLink || '',
        embeddable: item.accessInfo && item.accessInfo.embeddable || false,
        pdf: item.accessInfo && item.accessInfo.pdf && item.accessInfo.pdf.isAvailable || false,
        epub : item.accessInfo && item.accessInfo.epub && item.accessInfo.epub.isAvailable || false,
        id: item.id,
        selfLink: item.selfLink
    }
}
