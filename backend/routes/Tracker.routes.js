var tracker = require("../controllers/Tracker.controller");

module.exports = (app) => {
    app.post("/api/attendee/register", tracker.register);
    app.post("/api/attendee/allAttendees", tracker.allAttendees);
    app.post("/api/attendee/getExistingAttendee", tracker.getExistingAttendee);
    app.post("/api/attendee/addNewAttendee", tracker.addNewAttendee);
    app.post("/api/attendee/searchAttendees", tracker.searchAttendees);
};
