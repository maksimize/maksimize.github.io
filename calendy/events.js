const events = {
    travels: [
        ['egypt', 1, 1],
        ['austria', 10, 1],
        ['sweden', 26, 1],
        ['austria', 15, 2],
        ['sweden', 27, 2],
        ['poland', 11, 3],
        ['sweden', 14, 3],
        ['austria', 20, 3],
        ['sweden', 28, 3],
        ['croatia', 6, 6],
        ['undecided', 12, 6],

    ],
    doodle: [
        ['ski', 23, 1],
        ['ski', 26, 2],
        ['pager', 28, 2, 6, 3],
        ['dancing', 11, 3, 13, 3],
        ['pager', 14, 3, 20, 3],
        ['table-games', 18, 3],
        ['ski', 19, 3],
        ['dancing', 25, 3, 27, 3],
        ['pager', 28, 3, 3, 4],
        ['ramadan', 2, 4],
        ['easter', 15, 4, 18, 4],
        ['holiday', 15, 4, 18, 4],
        ['holiday', 26, 5],
        ['kubernetes', 16, 5, 20, 5],
        ['dancing', 26, 5, 29, 5],
        ['holiday', 25, 6],
        ['dancing', 6, 6, 11, 6],
    ],
    emojs: [
        // ['⛷️', 23, 1],
        // ['⛷️', 26, 2],
        // ['📟', 28, 2, 6, 3],
        // ['🕺', 11, 3, 13, 3],
        // ['📟', 14, 3, 20, 3],
        // ['🎲', 18, 3],
        // ['⛷️', 19, 3],
        // ['🕺', 25, 3, 27, 3],
        // ['📟', 28, 3, 3, 4],
        // ['🐇', 15, 4, 18, 4],
        // ['🛋️', 15, 4, 18, 4],
        // ['🛋️', 26, 5],
        // ['☸️', 16, 5, 20, 5],
        // ['🕺', 26, 5, 29, 5],
        // ['🛋️', 25, 6],
        // ['🕺', 6, 6, 11, 6],
    ]
};

function today() {
    const today = new Date();
    getDateElement(today)
        .addClass('today')
}

function fillEvents(events) {
    travels = events.travels;
    doodle = events.doodle;
    emojs = events.emojs;
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

    for (let index = 0; index < emojs.length; index++) {
        let start = dateObj(emojs[index][1], emojs[index][2]);
        let end = start;
        if (emojs[index].length > 3) {
            end = dateObj(emojs[index][3], emojs[index][4]);
        }
        addEmojs(emojs[index][0], start, end);

    }
}

function fillCountry(countryObjArrival, countryObjDeparture) {
    addDoodle('airplane', countryObjArrival.date);
    // addEmojs('✈️', countryObjArrival.date);
    // console.log(countryObjArrival.date);
    loopThroughDates(countryObjArrival.date, countryObjDeparture.date, function(loopDate) {
        if (loopDate.getTime() != countryObjDeparture.date.getTime()) {
            getDateElement(loopDate)
                // .children('.doodles')
                .addClass('flag')
                .addClass('flag-' + countryObjArrival.country);
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

function addEmojs(emoj, start, end) {
    if (!end) {
        end = start;
    }
    loopThroughDates(start, end, function(loopDate) {
        getDateElement(loopDate).children('.doodles').append(emoj);
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


today()

fillEvents(events);