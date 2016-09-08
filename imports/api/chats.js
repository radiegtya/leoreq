import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Chats = new Mongo.Collection("chats");

/*
 * define the schema
 */
var schemas = new SimpleSchema({
    requestId: {
        type: String,
        label: "Request",
    },
    text: {
        type: String,
        label: "Text",
    },
    replyFrom: {
        type: String,
        label: "Text",
        optional: true
    },
    replyText: {
        type: String,
        label: "Text",
        optional: true
    },
    status: {
        type: String,
        label: "Status",
        optional: true
    },
    /* additional field to save url file upload*/
    type: {
        type: String,
        label: "Type",
        optional: true,
    },
    /* this is useful for livechat */
    name: {
        type: String,
        label: "Name",
        optional: true
    },
    email: {
        type: String,
        label: "Email",
        optional: true
    },
    deviceInfo: {
        type: "String",
        label: "Device Info",
        optional: true
    },
    /* ./this is useful for livechat */
    isHidden: {
        type: Boolean,
        label: "is hidden",
        optional: true
    },
    isHiddenTo: {//string of userId
        type: [String],
        label: "is hidden to",
        optional: true
    },
    /* AUTOVALUE */
    userId: {
        type: String,
        label: "Created by",
        autoValue: function () {
            if (this.isInsert && this.userId)
                return Meteor.user()._id;
        },
        denyUpdate: true,
        optional: true
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function () {
            if (this.isInsert && !this.value)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    }
});
//attach the schema to collection
Chats.attachSchema(schemas);

/*
 * allow insert for loggedin user which is called group "user"
 * and also allow insert for admin user which is called group "admin"
 * in this tutorial we'll use simple GROUP ROLE functionality
 * you can modify this later if you want to use "userIsInRole" rather than "userIsInGroup"
 */
Chats.allow({
    insert: function (userId, doc) {
        return Meteor.userId() ? true : false;
    },
    update: function (userId, doc) {
        return Meteor.userId() ? true : false;
    },
    remove: function (userId, doc) {
        return Meteor.userId() == userId ? true : false;
    },
});

if(Meteor.isServer){
  Meteor.publishComposite('chats', function (selector, options) {
    var selector = selector || {};
    var options = options || {};

    return{
        find: function () {
            return Chats.find(selector, options);
        },
        children: [
            /* belongsTo user - owner */
            {
                find: function (collection) {
                    return Meteor.users.find(collection.userId);
                }
            },
        ],
    };

});
}
