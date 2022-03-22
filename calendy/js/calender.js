const daysTag = $('#days');
const targetYear1stDay = getTargetYearDate();
const targetYearAfter1stDay = getTargetYearDate(false, false, 1);

lastYearDaysToFill = targetYear1stDay.getDay() - 1;
if (lastYearDaysToFill < 0) {
    lastYearDaysToFill = targetYear1stDay.getDay() + 6;
}

for (let index = lastYearDaysToFill; index > 0; index--) {
    let lastYearDate = new Date(targetYear1stDay.getFullYear(), targetYear1stDay.getMonth(), targetYear1stDay.getDate() - index);
    el = $('<div>')
        .addClass('col-md-1 cell hidden')
        .text(lastYearDate.getDate());
    daysTag.append(el);
}

loopThroughDates(targetYear1stDay, targetYearAfter1stDay, function(loopDate) {

    el = $('<div>')
        .addClass(getCellClasses(loopDate))
        .attr('data-date', loopDate.toISOString().split('T')[0])
    dayElement = $('<div>')
        .addClass('row day-number')
        .text(getCellTitle(loopDate));
    doodlesElement = $('<div>')
        .addClass('row doodles');
    el.append(dayElement).append(doodlesElement);
    daysTag.append(el);
});

function getCellTitle(loopDate) {
    let dateString = loopDate.getDate();
    if (dateString == 1) {
        dateString = loopDate.toLocaleString('default', { day: 'numeric', month: 'long' });
    }
    return dateString;
}

function getCellClasses(loopDate) {
    let classes = 'col-md-1 cell';
    let today = new Date();
    // today = getTargetYearDate(today.getDate())
    // console.log(loopDate, today)

    if (loopDate < today) {
        classes = classes + ' past-date'
    } else if (loopDate == today) {
        console.log('z')
    } else {
        classes = classes + ' future-date'
    }

    return classes;
}