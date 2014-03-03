/**
 * Created by abhijeet on 26/2/14.
 */
Notes = new Meteor.Collection("notes");
Tags = new Meteor.Collection("tags");

Meteor.publish('notes', function (tgs) {
    return tgs ? Notes.find({tags: tgs}) : Notes.find({});
});

Meteor.publish('tags', function () {
    return Tags.find({count:{$gt:0}},{limit:15});
});

Notes.allow({
    insert: function (name, noteText) {
        return false;
    },
    remove:function(){
        return false;
    }
});

Tags.allow({
    insert: function () {
        return false;
    },
    remove:function(){
        return false;
    }
});

Meteor.methods({
    saveNote: function (noteText, nodeTag, ownerIdentifier) {
        // if no tags so, store no tags
        tagsArr = nodeTag? nodeTag.split(','):null;

        var id = '';
        id = Notes.insert({
            text: noteText,
            time: Date.now(),
            tags: tagsArr,
            ownerId: ownerIdentifier
        });

        // saving tag in collection
        _.each(tagsArr, function (tg) {
            console.log(tg)
            if (tg !== '') {
                Tags.update({name: tg}, {$inc: {count: 1}}, {upsert: true});
            }
        });

    },

    deleteNote: function (id) {
        tagsArr= Notes.findOne({_id: id}).tags;

        // remove the related from 'Tags' collection
        _.each(tagsArr, function (tg) {
            if (tg !== '') {
                Tags.update({name: tg}, {$inc: {count: -1}}, {upsert: true});
            }
        });

        // actually remove
        Notes.remove({_id: id});
    }

});

