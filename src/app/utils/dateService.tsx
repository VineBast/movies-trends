
export function getLastThursday() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const daysUntilLastFriday = (currentDayOfWeek + 7 - 5) % 7;
    const lastFriday = new Date(currentDate);
    lastFriday.setDate(currentDate.getDate() - daysUntilLastFriday);
    return lastFriday;
}

function isLastThursdayPast(dateString: string) {
    const inputDate = new Date(dateString);
    return (inputDate.getDate() === getLastThursday().getDate());
}

export function filterMoviesByDate(data: any) {
    const filteredData = data.filter((item: any) => {
        if (isLastThursdayPast(item.releaseDate)) {
            return item;
        }
    });
    return filteredData;
}

