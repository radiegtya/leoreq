import {Meteor} from 'meteor/meteor';

Meteor.methods({
  'Users.findOne': (selector)=>{
    return Meteor.users.findOne(selector);
  }
});
