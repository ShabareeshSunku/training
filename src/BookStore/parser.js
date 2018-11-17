export default function parseData(items = []) {
    let itemLen = items.length
    let parsedItems = []
    for (let i = 0; i < itemLen; i++) {
        let item = items[i] || {}
        parsedItems.push({
            title: item.volumeInfo && item.volumeInfo.title || '',
            subtitle: item.volumeInfo && item.volumeInfo.subtitle || '',
            description: item.volumeInfo && item.volumeInfo.description || '',
            authors: item.volumeInfo && item.volumeInfo.authors || [],
            rating: item.volumeInfo && item.volumeInfo.averageRating || 0,
            count: item.volumeInfo && item.volumeInfo.ratingsCount || 0,
            thumbnail: item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail || '',
            price: item.saleInfo && item.saleInfo.retailPrice &&  item.saleInfo.retailPrice.amount || '',
            listPrice: item.saleInfo && item.saleInfo.listPrice && item.saleInfo.listPrice.amount || '',
            id: item.id,
            selfLink : item.selfLink
        })
    }
    return parsedItems
}