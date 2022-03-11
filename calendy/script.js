const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryStringYear = urlParams.get('year');

function getTargetYearDate(day, month, yearOffset) {
    if (!day) {
        day = "01";
    }
    if (!month) {
        month = "01";
    }
    if (!yearOffset) {
        year = queryStringYear;
    } else {
        year = parseInt(queryStringYear) + yearOffset;
    }
    return new Date(month + "/" + day + "/" + year + " 00:00:00+00");
}

function loopThroughDates(start, end, fn) {
    let loopDate = new Date(start);
    while (loopDate <= end) {
        fn(loopDate);
        let newDate = loopDate.setDate(loopDate.getDate() + 1);
        loopDate = new Date(newDate);
    }
}