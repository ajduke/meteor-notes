Notes = new Meteor.Collection("notes");

Template.viewNotes.events = {
    'click #del' : function(event){
        console.log('delete called')
   }
}

Template.inputDiv.events = {
    'click #btn' : function(event){
       setNotes(event)
    },
    'keydown input#noteText' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
       setNotes(event)
    }
    }
}

function setNotes(event){
    var name = 'Anonymous';
    var noteText = $('#noteText');
    if (noteText.val() != '') {
        Notes.insert({
            name: name,
            text: noteText.val(),
            time: Date.now()
        });
        noteText.val(' ');
    }else{
        noteText.attr("placeholder", "Notes with empty text not allowed...!");
    }
}
Template.viewNotes.notes = function(){
    return Notes.find({},{sort:{time:-1}});
}