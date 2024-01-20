const addEvent = async (req,res) =>{
    res.send('Create Event');
}

const getEvents = async (req,res) =>{
    res.send("get Event");    
}

const deleteEvent = async (req,res) =>{
    res.send("delete Event");
}

const updateEvent = async (req,res) => {
    res.send("update Event");
}

module.exports = {
    UPDATEEVENT:updateEvent,
    GETEVENT:getEvents,
    ADDEVENT:addEvent,
    DELETEEVENT:deleteEvent
}