import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const eventSchema = new Schema(
    {
        type: {
            enum: ['Concert','Event','Meeting'],
            type: String,
            required: true
        },
        headline: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time:{
            type: String,
            require: true
        },
        location: {
            type: String,
            require: true
        },
        adress: {
            type:String,
            require: true
        }
    },
    {
        timestamps: true
    }
);


export default model('Event', eventSchema);