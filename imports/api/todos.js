import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Todos = new Mongo.Collection('todos');

if(Meteor.isServer){
  Meteor.publish('todos', ()=>{
    return Todos.find();
  });
}
