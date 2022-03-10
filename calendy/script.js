const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const year = urlParams.get('year');


const daysTag = $('#days');
const today = new Date();
const start = new Date("01/01/" + year + " 00:00:00+00");
const end = new Date("12/31/" + year + " 00:00:00+00");

lastYearDaysToFill = start.getDay() - 1;
if (lastYearDaysToFill < 0) {
    lastYearDaysToFill = start.getDay() + 6;
}
for (let index = lastYearDaysToFill; index > 0; index--) {
    let lastYearDate = new Date(start.getFullYear(), start.getMonth(), start.getDate() - index);
    el = $('<div>')
        .addClass('col-md-1 cell hidden')
        .text(lastYearDate.getDate());
    daysTag.append(el);
}


let loopDate = new Date(start);
while (loopDate <= end) {
    el = $('<div>')
        .addClass('col-md-1 cell')
        .attr('data-date', loopDate.toISOString().split('T')[0]);
    dayElement = $('<div>')
        .addClass('row day-number')
        .text(loopDate.getDate());
    doodlesElement = $('<div>')
        .addClass('row doodles');
    el.append(dayElement).append(doodlesElement);
    daysTag.append(el);
    let newDate = loopDate.setDate(loopDate.getDate() + 1);
    loopDate = new Date(newDate);
}


// DATA POPULATION

function dateElement(day, month) {
    date = year + '-' + month.toString().padStart(2, "0") + '-' + day.toString().padStart(2, "0");
    tag = '[data-date="' + date + '"]';
    return $(tag);
}

function fillCountry(countryObjArrival, countryObjDeparture) {
    // addDoodle('airplane', dateObj(11, 3));
    addDoodle('airplane', dateObj(countryObjArrival.date.getDate(), countryObjArrival.date.getMonth() + 1));


    let loopDate = countryObjArrival.date;
    while (loopDate <= countryObjDeparture.date) {
        dateElement(loopDate.getDate(), loopDate.getMonth() + 1)
            .addClass('flag')
            .addClass('flag-' + countryObjArrival.country);
        let newDate = loopDate.setDate(loopDate.getDate() + 1);
        loopDate = new Date(newDate);
    }
}

function dateObj(day, month) {
    return {
        day: day,
        month: month
    }
}

function countryObj(arr) {
    return {
        country: arr[0],
        date: new Date(arr[2] + "/" + arr[1] + "/" + year + " 00:00:00+00")
    }
}
travels = [
    ['egypt', 1, 1],
    ['austria', 10, 1],
    ['sweden', 26, 1],
    ['sweden', 1, 2],
    ['austria', 15, 2],
    ['sweden', 27, 2],
    ['poland', 11, 3],
    ['sweden', 14, 3],
    ['austria', 20, 3],
    ['undecided', 29, 3],
    ['croatia', 6, 6],
    ['undecided', 12, 6],
];
for (let index = 0; index < travels.length; index++) {
    countryObjArrival = countryObj(travels[index]);
    if (travels[index + 1] !== undefined) {
        countryObjDeparture = countryObj(travels[index + 1]);
    } else {
        countryObjDeparture = countryObj(['blank', 31, 12]);
    }
    fillCountry(countryObjArrival, countryObjDeparture);
}


function addDoodle(badge, start, end) {
    if (!end) {
        end = start;
    }
    for (let index = start.day; index <= end.day; index++) {
        el = $('<div>')
            .addClass('doodle')
            .addClass('doodle-' + badge);
        dateElement(index, start.month).children('.doodles').append(el);
    }
}


addDoodle('dancing', dateObj(11, 3), dateObj(13, 3));
addDoodle('dancing', dateObj(25, 3), dateObj(27, 3));

addDoodle('pager', dateObj(1, 3), dateObj(6, 3));
addDoodle('pager', dateObj(14, 3), dateObj(20, 3));

$(dateElement(10, 3)).addClass("today");