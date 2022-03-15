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
        .addClass('col-md-1 cell')
        .attr('data-date', loopDate.toISOString().split('T')[0])
    dayElement = $('<div>')
        .addClass('row day-number')
        .text(loopDate.getDate());
    doodlesElement = $('<div>')
        .addClass('row doodles');
    el.append(dayElement).append(doodlesElement);
    daysTag.append(el);
});