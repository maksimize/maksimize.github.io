const daysTag = $('#days');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryStringYear = urlParams.get('year');
const calendarStartDay = moment(queryStringYear).startOf('year').startOf('isoWeek')
const calendarEndDay = moment(queryStringYear).endOf('year').endOf('isoWeek')
console.log(calendarStartDay.format('YYYY-MM-DD'));
console.log(calendarEndDay.format('YYYY-MM-DD'));

for (var m = moment(calendarStartDay); m.diff(calendarEndDay, 'days') <= -1; m.add(1, 'days')) {
    el = $('<div>')
        .addClass(getCellClasses(m))
        .attr('data-date', m.format('YYYY-MM-DD'))
    dayElement = $('<div>')
        .addClass('row day-number')
        .text(getCellTitle(m));
    doodlesElement = $('<div>')
        .addClass('row doodles');
    el.append(dayElement).append(doodlesElement);
    daysTag.append(el);
}

function getCellTitle(date) {
    let dateString = date.date();
    if (dateString == 1) {
        dateString = date.format('DD MMMM')
    }
    return dateString;
}

function getCellClasses(date) {
    let classes = 'col-md-1 cell';
    let today = moment();
    if (date.isBefore(today, 'day')) {
        classes = classes + ' past-date'
    } else if (date.isAfter(today, 'day')) {
        classes = classes + ' future-date'
    } else {
        classes = classes + ' today'
    }
    return classes;
}