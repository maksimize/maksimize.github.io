function fillEvents(events) {
    doodle = events.doodle;
    for (let index = 0; index < doodle.length; index++) {
        let start = dateObj(doodle[index][1], doodle[index][2]);
        let end = start;
        if (doodle[index].length > 3) {
            end = dateObj(doodle[index][3], doodle[index][4]);
        }
        addDoodle(doodle[index][0], start, end);
    }
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