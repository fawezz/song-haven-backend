
import { parse } from "dotenv";

import Band from '../models/band.js';
import User from '../models/user.js';
import Event from '../models/event.js';

export async function addEvent(req, res) {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      dateEvent: req.body.dateEvent,
      owner: req.body.owner,
      location: {
        type: "Point",
        coordinates: [req.body.longitude, req.body.latitude],
      },
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

    export async function modify(req, res) {
      const { eventId, title, description, date ,location } = req.body;
      try {
        let event = await Event.findByIdAndUpdate(eventId,
          {
            $set: {
              title,
              description,
              date,
              location
            }
          });
        if (event == null) {
          res.status(404).json({ message: "event not found not found" });
        } else {
          res.status(201).json({ message: "event updated successfully", event });
        }
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }



    export async function remove(req, res) {
      try {
        const event = await Event
          .findByIdAndDelete(req.params.id);
    
        if (!event) {
          res.status(404).json({ "message": "Event not found" })
        }
        res.status(200).json({ "message": "Deleted event" })
      }
      catch (err) {
        res.status(500).json({ "message": err })
        console.log(err);
      }
    }



    export async function getAll(req, res) {
      try {
        let events = await Event.find();
    
        if (events.length == 0) {
          return res.status(404).json({ message: "No events found" });
        }
        return res.status(200).json({ events });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
    }

    export async function getByUser(req, res) {
      const userId = req.params.userId;
      // console.log(userId)
      try {
        var user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "user not found" })
        }
    
        let events = await Event.find({ users : { '_id': user.id } })//{ 'id': user.id }
          .populate('users', 'firstname lastname imageId');
        if (events.length == 0) {
          return res.status(404).json({ events: [] });
        }
        return res.status(200).json({ events });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
    }
    