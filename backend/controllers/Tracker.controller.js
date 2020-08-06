var mongoose = require('mongoose');
const Tracker = mongoose.model('Tracker');

exports.register = async (req, res) =>  {
    let tracker = new Tracker(req.body);
    tracker.save((err) => {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while tracker registering."});
        } else {
            res.status(200).json({success:true, tracker: tracker});
        }
    }); 
};

exports.allAttendees = async (req, res) =>  {
    let attendee = await Tracker.find();
    res.json({attendee: attendee});
};

exports.getExistingAttendee = async (req, res) =>  {
    let attendeeObj = req.body;

    let session = attendeeObj.session

    if (session == null) {
      return res.status(400).json({ success: false, field: "session", error: "Session not provided" })
    }

    let attendee = await Tracker.find({id: attendeeObj.id, session: session});
    res.json({attendee: attendee});

};

exports.addNewAttendee = async (req, res) =>  {
    let attendeeObj = {
        id: "1",
        name: req.body.name,
        mobile: req.body.mobile,
        session: "1",
        storeConsent: req.body.storeConsent,
        badgeHolder: req.body.badgeHolder,
    }

    let attendee = new Tracker(attendeeObj);
    attendee.save((err) => {
        if (err) {
            return res.json({success: false, errMessage: "Unknown errors occurred while tracker registering."});
        } else {
            res.status(200).json({success:true, attendee: attendee});
        }
    }); 

};

exports.searchAttendees = async (req, res) =>  {
    let attendeeObj = req.body;

    let mobile = attendeeObj.mobile
    // if (mobile == null) {
    //   return res.status(400).json({ success: false, field: "mobile", error: "Mobile not provided" })
    // }

    let attendee = await Tracker.find({mobile: mobile});
    res.json({attendee: attendee});

};

