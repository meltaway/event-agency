function validateBooking(event: string, date: Date, location: string, type: string) {
    return !!event && !!date && !!location && !!type;
}

function formatBooking(event: string, date: Date, location: string, type: string, venue: string, note: string | null, locale: string) {
    const options = { year: "numeric", month: "long", day: 'numeric' } as const;
    return {
        event,
        'date': date.toLocaleDateString(locale, options),
        location, type, venue, locale, note
    }
}

export {validateBooking, formatBooking}