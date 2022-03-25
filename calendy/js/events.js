function fillEvents(events) {
    travels = events.travels;
    doodle = events.doodle;
    for (let index = 0; index < travels.length; index++) {
        countryObjArrival = countryObj(travels[index]);
        if (travels[index + 1] !== undefined) {
            countryObjDeparture = countryObj(travels[index + 1]);
        } else {
            countryObjDeparture = countryObj(['blank', 31, 12]);
        }
        fillCountry(countryObjArrival, countryObjDeparture);
    }


    for (let index = 0; index < doodle.length; index++) {
        let start = dateObj(doodle[index][1], doodle[index][2]);
        let end = start;
        if (doodle[index].length > 3) {
            end = dateObj(doodle[index][3], doodle[index][4]);
        }
        addDoodle(doodle[index][0], start, end);
    }
}

function fillCountry(countryObjArrival, countryObjDeparture) {
    addDoodle('airplane', countryObjArrival.date);
    loopThroughDates(countryObjArrival.date, countryObjDeparture.date, function(loopDate) {
        el = getDateElement(loopDate).addClass('flag');
        if (loopDate.getTime() == countryObjArrival.date.getTime()) { // 1st day
        } else if (loopDate.getTime() == countryObjDeparture.date.getTime()) { // last day
            el.addClass('flag-merge').addClass('flag-' + countryObjArrival.country + "-" + countryObjDeparture.country);
        } else {
            el.addClass('flag-' + countryObjArrival.country);
        }
    })
}

function addDoodle(doodle, start, end) {
    if (!end) {
        end = start;
    }
    loopThroughDates(start, end, function(loopDate) {
        el = $('<div>')
            .addClass('doodle')
            .addClass('doodle-' + doodle);
        getDateElement(loopDate).children('.doodles').append(el);
    });
}

function getDateElement(date) {
    day = date.getDate();
    month = date.getMonth() + 1;
    date = getTargetYearDate().getFullYear() + '-' + month.toString().padStart(2, "0") + '-' + day.toString().padStart(2, "0");
    tag = '[data-date="' + date + '"]';
    return $(tag);
}

function countryObj(arr) {
    return {
        country: arr[0],
        date: dateObj(arr[1], arr[2])
    }
}

function dateObj(day, month) {
    return getTargetYearDate(day, month);
}

fillEvents(events);