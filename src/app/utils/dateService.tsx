function isLastThursdayPast(dateString: string) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const daysUntilLastFriday = (currentDayOfWeek + 7 - 5) % 7;
    const lastFriday = new Date(currentDate);
    lastFriday.setDate(currentDate.getDate() - daysUntilLastFriday);
    return (inputDate.getDate() === lastFriday.getDate());
}

function formatDate(inputDate: string) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const parts = inputDate.split(' ');
    const monthAbbreviation = parts[1];
    const day = parts[2];
    const year = parts[3];

    const monthIndex = months.findIndex(month => month.startsWith(monthAbbreviation));

    if (monthIndex !== -1) {
        const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
        return formattedDate;
    } else {
        console.error('Mois invalide');
        return null;
    }
}

export function filterMoviesByDate(data: any) {
    const filteredData = data.filter((item: any) => {
        if (isLastThursdayPast(item.releaseDate)) {
            return item;
        }
    });
    return filteredData;
}

