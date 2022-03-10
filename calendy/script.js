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
        .addClass('row')
        .text(loopDate.getDate());
    doodlesElement = $('<div>')
        .addClass('row doodles');
    el.append(dayElement).append(doodlesElement);
    daysTag.append(el);
    let newDate = loopDate.setDate(loopDate.getDate() + 1);
    loopDate = new Date(newDate);
}


// DATA POPULATION

function dateElement(date) {
    day = '2022-03-' + date.toString().padStart(2, "0");
    tag = '[data-date="' + day + '"]';
    return $(tag);
}

function fillCountry(country, start, end) {
    for (let index = start; index <= end; index++) {
        dateElement(index)
            .addClass('flag')
            .addClass('flag-' + country);
    }
}

function addDoodle(badge, start, end) {
    if (!end) {
        end = start;
    }
    for (let index = start; index <= end; index++) {
        el = $('<div>')
            .addClass('doodle')
            .addClass('doodle-' + badge);
        dateElement(index).children('.doodles').append(el);
    }
}


fillCountry('sweden', 1, 10);
fillCountry('poland', 11, 14);
fillCountry('sweden', 15, 19);
fillCountry('austria', 20, 27);
fillCountry('sweden', 28, 31);

addDoodle('airplane', 11);
addDoodle('airplane', 14);
addDoodle('airplane', 20);


addDoodle('dancing', 11, 13);
addDoodle('dancing', 25, 27);

addDoodle('pager', 1, 6);
addDoodle('pager', 14, 20);

$(dateElement(10)).addClass("today");