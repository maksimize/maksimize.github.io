const daysTag = $('#days');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryStringYear = urlParams.get('year');
const calendarStartDay = moment(queryStringYear).startOf('year').startOf('isoWeek')
const calendarEndDay = moment(queryStringYear).endOf('year').endOf('isoWeek')

// String.prototype.startsWith = function(needle)
// {
//     return this.indexOf(needle) === 0;
// };

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
    if (date.format('M') % 2) {
        classes = classes + ' even-month-date'
    } else {
        classes = classes + ' odd-month-date'
    }

    if (!date.isBefore(today, 'day') && !date.isAfter(today, 'day')) {
        classes = classes + ' today'
    }

    return classes;
}


document.addEventListener('scroll', function(e) {
    fullHeight = document.body.scrollHeight;
    lastKnownScrollPosition = window.scrollY;
    windowHeight = document.documentElement.clientWidth;
    monthHeight = fullHeight / 12;
    x = 2 * (windowHeight - monthHeight);
    currentMonthPosition = Math.floor((lastKnownScrollPosition + x) / monthHeight) + 1
    currentMonthPosition = ("0" + currentMonthPosition).slice(-2);

    $('.cell').forEach(function(item) {
        day = $(item).attr('data-date');
        if (day) {

            if (day.startsWith('2022-' + currentMonthPosition)) {
                $(item).removeClass('unfocused');

            } else {
                $(item).addClass('unfocused');
            }
        }
    });
});