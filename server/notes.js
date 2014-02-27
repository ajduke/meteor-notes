/**
 * Created by abhijeet on 26/2/14.
 */
Notes = new Meteor.Collection("notes");
Meteor.publish('notes',function(){
	return Notes.find({name:'AAAA'});
});


Notes.allow({
  insert: function (name, noteText) {
    return false;
  }
});

Meteor.methods({
	saveNote: function(name, noteText){
		    Notes.insert({
            name: name,
            text: noteText,
            time: Date.now()
        });
      
	}

});

