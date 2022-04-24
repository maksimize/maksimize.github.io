const daysTag = $('#days');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryStringYear = urlParams.get('year');
const calendarStartDay = moment(queryStringYear).startOf('year').startOf('isoWeek')
const calendarEndDay = moment(queryStringYear).endOf('year').endOf('isoWeek')

for (var m = moment(calendarStartDay); m.diff(calendarEndDay, 'days') <= -1; m.add(1, 'days')) {
    let el = $('<div>')
        .addClass(getCellClasses(m))
        .attr('data-date', m.format('YYYY-MM-DD'))
    let dayElement = $('<div>')
        .addClass('row day-number')
        .text(getCellTitle(m));
    let doodlesElement = $('<div>')
        .addClass('row doodles');
    el.append(dayElement).append(doodlesElement);
    daysTag.append(el);
}

function getCellTitle(date) {
    let dateString = date.date();
    if (dateString == 1) {
        dateString = date.format('D MMMM')
    }
    return dateString;
}

function getCellClasses(date) {
    let classes = 'col-md-1 cell';
    let today = moment();
    if(date.format('M')%2){
        classes = classes + ' even-month-date'
    } else {
        classes = classes + ' odd-month-date'
    }

    if (!date.isBefore(today, 'day') && !date.isAfter(today, 'day')) {
        classes = classes + ' today'
    }
    
    return classes;
}