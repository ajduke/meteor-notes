/**
 * Created by abhijeet on 26/2/14.
 */
Notes = new Meteor.Collection("notes");
Meteor.publish('notes',function(){
	return Notes.find({});
});


Notes.allow({
  insert: function (name, noteText) {
    return false;
  }
});

Meteor.methods({
	saveNote: function(name, noteText,nodeTag){
            tagsArr = nodeTag.split(',')
            var id = Notes.insert({
            name: name,
            text: noteText,
            time: Date.now(),
            tags: tagsArr

        });
//        console.log('inserted new note '+id);
	},

    deleteNote: function(id) {
//        console.log('delete called on '+id)
        Notes.remove({_id:id});
    }

});

