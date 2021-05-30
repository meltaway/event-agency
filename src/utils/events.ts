function searchEvents(array: Array<any>, query: string) {
    return array.filter((e) => e.event.includes(query) || e.description.includes(query) || e.location.includes(query))
}

function filterEvents(array: Array<any>, filter: String, date: Date, type: any | null, query: string | null) {
    const toFilter = query ? searchEvents((type ? array.filter((e) => e.type === type.label) : array), query) : (type ? array.filter((e) => e.type === type.label) : array);
    switch(filter) {
        case 'before':
            return toFilter.filter((e) => new Date(e.date) <= date)
        case 'after':
            return toFilter.filter((e) => new Date(e.date) >= date)
        default:
            return toFilter;
    }
}

function sortEventsByDate(array: Array<any>) {
    return array.sort(function(a,b): any{
        return (new Date(a.date).getTime() - new Date(b.date).getTime());
    });
}

export {filterEvents, sortEventsByDate}