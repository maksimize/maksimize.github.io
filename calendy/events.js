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

function fillCountry(countryObjArrival, countryObjDeparture) {
    addDoodle('airplane', countryObjArrival.date);
    loopThroughDates(countryObjArrival.date, countryObjDeparture.date, function(loopDate) {
        getDateElement(loopDate)
            // .children('.doodles')
            .addClass('flag')
            .addClass('flag-' + countryObjArrival.country);
    })
}

function getDateElement(date) {
    day = date.getDate();
    month = date.getMonth() + 1;
    date = year + '-' + month.toString().padStart(2, "0") + '-' + day.toString().padStart(2, "0");
    tag = '[data-date="' + date + '"]';
    return $(tag);
}


function dateObj(day, month) {
    return getTargetYearDate(day, month);
}

function countryObj(arr) {
    return {
        country: arr[0],
        date: dateObj(arr[1], arr[2])
    }
}

function addDoodle(doodle, start, end) {
    if (!end) {
        end = start;
    }
    loopThroughDates(start, end, function(loopDate) {
        console.log(getDateElement(loopDate));
        el = $('<div>')
            .addClass('doodle')
            .addClass('doodle-' + doodle);
        getDateElement(loopDate).children('.doodles').append(el);
    });
}


addDoodle('dancing', dateObj(11, 3), dateObj(13, 3));
addDoodle('dancing', dateObj(25, 3), dateObj(27, 3));

addDoodle('pager', dateObj(1, 3), dateObj(6, 3));
addDoodle('pager', dateObj(14, 3), dateObj(20, 3));
// addDoodle('sweden', dateObj(1, 1), dateObj(1, 2));

// $(dateElement(10, 3)).addClass("today");