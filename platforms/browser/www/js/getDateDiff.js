/*
 * 
 * 
 */
function getDateDiff(date1, date2, interval) {
    var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;
    date1 = new Date(date1).getTime();
    date2 = (date2 == 'now') ? new Date().getTime() : new Date(date2).getTime();
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
    case "years":
        return date2.getFullYear() - date1.getFullYear();
    case "months":
        return ((date2.getFullYear() * 12 + date2.getMonth()) - (date1.getFullYear() * 12 + date1.getMonth()));
    case "weeks":
        return Math.floor(timediff / week);
    case "days":
        return Math.floor(timediff / day);
    case "hours":
        return Math.floor(timediff / hour);
    case "minutes":
        return Math.floor(timediff / minute);
    case "seconds":
        return Math.floor(timediff / second);
    default:
        return undefined;
    }
}