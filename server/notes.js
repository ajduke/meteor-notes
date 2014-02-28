/**
 * Created by abhijeet on 26/2/14.
 */
Notes = new Meteor.Collection("notes");

Meteor.publish('notes',function(tgs){
    return tgs? Notes.find({tags:tgs}) : Notes.find({});
});


Notes.allow({
  insert: function (name, noteText) {
    return false;
  }
});

Meteor.methods({
	saveNote: function(name, noteText,nodeTag){
            tagsArr = nodeTag.split(',')
           // save note as by default
            var id = Notes.insert({
            name: name,
            text: noteText,
            time: Date.now(),
            tags: tagsArr

        });
        // save tags by default
//      console.log('inserted new note '+id);
	},

    deleteNote: function(id) {
//        console.log('delete called on '+id)
        Notes.remove({_id:id});
    }

});

