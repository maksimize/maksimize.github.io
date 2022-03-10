const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const year = urlParams.get('year');


var daysTag = $('#days');
const today = new Date();
const start = new Date("01/01/" + year);
const end = new Date("12/31/" + year);

lastYearDaysToFill = start.getDay() - 1;
if (lastYearDaysToFill < 0) {
    lastYearDaysToFill = start.getDay() + 6;
}
for (let index = lastYearDaysToFill; index > 0; index--) {
    let lastYearDate = new Date(start.getFullYear(), start.getMonth(), start.getDate() - index);
    daysTag.append('<div class="col-md-1 cell hidden">' + lastYearDate.getDate() + '</div>');
}


let loopDate = new Date(start);
while (loopDate <= end) {
    newElement = $('<div class="col-md-1 cell" data-date="' + loopDate.toISOString().split('T')[0] + '">' + loopDate.getDate() + '</div>');
    // console.log(loopDate.toDateString() + " ### " + today.toDateString());
    if (loopDate.toDateString() == today.toDateString()) {
        console.log("today")
        newElement.addClass("today");
    }
    daysTag.append(newElement);
    let newDate = loopDate.setDate(loopDate.getDate() + 1);
    loopDate = new Date(newDate);
}