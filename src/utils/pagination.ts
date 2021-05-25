const maxPageSize: number = 8
const defaultPageSize: number = 8

export default function getPaginatedItems(page: any, per_page: any, itemsArray) {
    if (itemsArray.length === 0) return itemsArray

    if (!page || !per_page) {
        itemsArray.splice(defaultPageSize)
        return itemsArray
    }

    try {
        page = Number(page)
        per_page = Number(per_page)
    } catch (err) {
        itemsArray.splice(defaultPageSize)
        return itemsArray
    }

    if (per_page < 1) per_page = defaultPageSize

    if (per_page > maxPageSize) per_page = maxPageSize

    const pageCount: number = Math.ceil(itemsArray.length / per_page)

    if (page < 1) {
        itemsArray.splice(defaultPageSize)
        return itemsArray
    }

    if (page > pageCount) {
        if (itemsArray.length < per_page) return []
        return itemsArray.splice(itemsArray.length - per_page)
    }

    return itemsArray.splice((page - 1) * per_page, per_page)
}