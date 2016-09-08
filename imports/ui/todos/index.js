import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {Todos} from '../../api/todos.js';

import './index.html';

Template.TodosIndex.onCreated(function TodosIndexCreated(){
  Meteor.subscribe('todos');
});

Template.TodosIndex.helpers({
  hello: ()=>{
    return "Hello World";
  },
  todos: ()=>{
    //find all todos from mongo
    return Todos.find();
  }
});
