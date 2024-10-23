import Event from "../models/eventModel.js";
import { throwError } from "../util/error.js";

const getAllEvents = async (req, res, next) => {
  const { name, location, month, year } = req.query;
  const filterQuery = {};
  try {
    if (name) {
      filterQuery.name = { $regex: `.*${name}.*`, $options: "i" };
    }
    if (location) {
      filterQuery.location = { $regex: `.*${location}.*`, $options: "i" };
    }

    if (month && year) {    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);  
      filterQuery.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    else if(year){
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      filterQuery.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    const events = await Event.find(filterQuery);
    if (!events) {
      return res.status(404).json({ error: "No events found" });
    }
    res.status(201).json(events);
  } catch (error) {
    throwError(next, error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    throwError(next, error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const newEvent = new Event(req.body);
    if (!newEvent) return res.status(404).json({ error: "Event not created" });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    throwError(next, error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const eventExits = await Event.findById(eventId);
    if (!eventExits) {
      return res.status(404).json({ error: error.message });
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    throwError(next, error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const eventExits = await Event.findById(eventId);
    if (!eventExits) {
      return res.status(404).json({ error: "Event not Exist" });
    }
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    throwError(next, error);
  }
};

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
