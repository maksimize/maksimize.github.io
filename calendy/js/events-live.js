const cal_id = "t49343ina8nt67f0kpls2jt6gk@group.calendar.google.com"
const api_key = "AIzaSyAwzQeP3wRq5v3VV7kfv6tWBUjyHTggTIw"

$.ajax({
    url: "https://www.googleapis.com/calendar/v3/calendars/" + cal_id + "/events?singleEvents=true&orderBy=startTime&key=" + api_key,
    success: function(data) {
        const events_live = { travels: [], events: [] };
        for (let i = 0; i < data.items.length; i++) {
            const item = data.items[i];
            if (item.summary.startsWith('Fly: ')) {
                events_live.travels.push({
                    country: item.summary.match(/\p{Emoji}+/gu)[0],
                    date: moment(item.start.dateTime)
                });
            } else {
                console.log(item);
                events_live.events.push({
                    event: item.summary.match(/\p{Emoji}+/gu)[0],
                    startDate: moment(item.start.date),
                    endDate: moment(item.end.date)
                });
            }
        }
        console.log(events_live.events)
        fillEventsLive(events_live);
    }
});

function fillEventsLive(events_live) {
    const travels = events_live.travels;
    for (let index = 0; index < travels.length; index++) {
        flyIn = travels[index];
        if (travels[index + 1] !== undefined) {
            flyOut = travels[index + 1];
        } else {
            flyOut = { country: flyIn.country, date: moment(flyIn.date).endOf("year") };
        }
        fillCountryLive(flyIn, flyOut);
    }

    const events = events_live.events;

    for (let index = 0; index < events.length; index++) {
        item = events[index];
        addDoodleLive(item.event, item.startDate, item.endDate)
    }
}

function fillCountryLive(flyIn, flyOut) {
    addDoodleLive('airplane', flyIn.date);

    for (var m = moment(flyIn.date); m.diff(flyOut.date, 'days') <= 0; m.add(1, 'days')) {
        el = getDateElementMoment(m.format('YYYY-MM-DD')).addClass('flag');
        if (m.isSame(flyOut.date)) {
            // last day
            el.addClass('flag-merge').addClass('flag-' + flyIn.country + "-" + flyOut.country);
        } else if (m.isSame(flyIn.date)) {
            // 1st day
        } else {
            el.addClass('flag-' + flyIn.country);
        }
    }
}

function addDoodleLive(doodle, startDate, endDate) {
    if (!endDate) {
        endDate = startDate;
    }
    for (var m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
        el = $('<div>')
            .addClass('doodle')
            .addClass('doodle-' + doodle);
        getDateElementMoment(m.format('YYYY-MM-DD')).children('.doodles').append(el);
    }
}

function getDateElementMoment(date) {
    tag = '[data-date="' + date + '"]';
    return $(tag);
}