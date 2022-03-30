const cal_id = "t49343ina8nt67f0kpls2jt6gk@group.calendar.google.com"
const api_key = "AIzaSyAwzQeP3wRq5v3VV7kfv6tWBUjyHTggTIw"

$.ajax({
    url: "https://www.googleapis.com/calendar/v3/calendars/" + cal_id + "/events?key=" + api_key,
    success: function(data) {
        for (let i = 0; i < data.items.length; i++) {
            const item = data.items[i];
            console.log(item.summary)
        }
    }
});
// message: "Google Calendar API has not been used in project 696361614824 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/calendar-json.googleapis.com/overview?project=696361614824 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry."