import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Request = new Mongo.Collection("request");

/*
 * define the schema
 */
var schemas = new SimpleSchema({
    name: {
        type: String,
        label: "Nama Pemohon",
    },
    instanceName: {
        type: String,
        label: "Nama Instansi",
        optional: true
    },
    businessType: {
        type: String,
        label: "Jenis Usaha",
        optional: true
    },
    address: {
        type: String,
        label: "Alamat",
    },
    rayon: {
        type: String,
        label: "Rayon",
    },
    rate: {
        type: Number,
        label: "Tarif",
    },
    power: {
        type: Number,
        label: "Daya",
    },
    powerNew: {
        type: Number,
        label: "Daya Baru",
        optional: true
    },
    paymentDate: {
        type: Date,
        label: "Tanggal Bayar",
        optional: true
    },
    finishedPlanDate: {
        type: Date,
        label: "Tanggal Rencana Nyala",
        optional: true
    },
    vendor: {
        type: String,
        label: "Vendor",
    },
    tmp: {
        type: String,
        label: "TMP",
        optional: true
    },
    tmpCountdown: {
        type: String,
        label: "TMP COUNTDOWN",
        optional: true
    },
    description: {
        type: String,
        label: "Keterangan",
        optional: true
    },
    status: {
        type: String,
        label: "Status",
    },
    requestType: {
        type: String,
        label: "Request Type",
    },
    /* AUTOVALUE */
    createdBy: {
        type: String,
        autoValue: function () {
            if (this.isInsert && !this.value)
                return this.userId;
        },
        denyUpdate: true,
        optional: true,
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function () {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true,
    }
});
//attach the schema to collection
Request.attachSchema(schemas);

/*
 * allow insert for loggedin user which is called group "user"
 * and also allow insert for admin user which is called group "admin"
 * in this tutorial we'll use simple GROUP ROLE functionality
 * you can modify this later if you want to use "userIsInRole" rather than "userIsInGroup"
 */
Request.allow({
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
  Meteor.publish('request', (selector = {}, options = {})=>{
    return Request.find(selector, options);
  });
}
