export const getDatesBetween = (startDate: Date, endDate: Date, includeEndDate?: boolean): Date[] => {
    let dates: Date[] = []
    const currentDate = startDate
    while (currentDate < endDate) {
        dates = [...dates, new Date(currentDate)]
        currentDate.setDate(currentDate.getDate() + 1)
    }
    if (includeEndDate) dates = [...dates, endDate]
    return dates
}

export const formatDates = (dates: Date[]): string[] =>
    dates.map((date) => new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day    : 'numeric',
        month  : 'long'
    }).format(new Date(date)))

export const numericDateRegexp = new RegExp('[0-9]{1,2}')
