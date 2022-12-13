
import { parse } from "dotenv";

import Band from '../models/band.js';
import User from '../models/user.js';
import Event from '../models/event.js';

    export async function addEvent(req,res){
    
        var event = await Event.create({
           nameEvent : req.body.nameEvent,
           date : req.body.date,
           user : req.body.user,
           band : req.body.band,
           adresse : req.body.adresse,
           location:{
            type : req.body.location.type,
            coordinates : req.body.location.coordinates
           },
           
           
          
        })
        event.save;
      
    }

    export const add = (req, res) => {
        let event = new Event({
            nameEvent : req.body.nameEvent,
            date : req.body.date,
            creator : req.body.creator,
            band : req.body.band,
            adresse : req.body.adresse,
            location:{
             type : req.body.location.type,
             coordinates : req.body.location.coordinates
            },
        })
      
     
        event.save()
          .then(response => {
            event.populate('creator');
            res.json({ message: 'Band Added successfuly!!' })
          })
          .catch(error => {
            res.json({
              message: 'An error occured'
            })
          })}