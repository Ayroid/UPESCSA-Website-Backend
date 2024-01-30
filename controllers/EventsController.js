const createEvent = (req,res) => {
    res.send("Create Event");
}

const deleteEvent = (req,res) => {
    res.send("Delete Event");
}

const updateEvent = (req,res) => {
    res.send("Update Event");
}

const getEvent = (req,res) => {
    res.send("Get Event");
}

export {
    createEvent as CREATEEVENT,
    getEvent as GETEVENT,
    updateEvent as UPDATEEVENT,
    deleteEvent as DELETEEVENT,
}