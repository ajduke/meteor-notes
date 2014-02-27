Notes = new Meteor.Collection("notes");

Meteor.startup(function () {
    Meteor.subscribe('notes');
});

Template.viewNotes.events = {
    'click .del' : function(event){
        var id= this._id;
        console.log('delete called '+id)
        if(id){
            Meteor.call('deleteNote',id);
        }
    },

    'mouseover div.thumbnail .txt': function(event){
//        var c = $(event.target);
//
//        console.log('Hover called '+event.target);
//        var t = c.prev('.lnk');
//        t.removeClass('hide')
//        t.addClass('show');

    },
    'mouseout div.thumbnail .txt': function(event){
//        var c = $(event.target);
//        console.log('Hover Out called');
//        var t = c.prev('.lnk');
//        t.removeClass('show');
//        t.addClass('hide');
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
    },
    'keydown input#noteTag' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
            setNotes(event)
        }
    }
}

function setNotes(event){
    var name = 'AAAA';
    var noteText = $('#noteText');
    var $noteTag = $('#noteTag');

    if (noteText.val() != '') {
        var nodeTag = $noteTag.val();
        tagsArr = nodeTag.split(',');
        if(tagsArr.length <=3){
            Meteor.call('saveNote', name, noteText.val(),nodeTag );
            noteText.val('');
            $noteTag.val('')
        }else {
            $noteTag.attr("placeholder", "Only upto 3 tags are allowed....!");
            $noteTag.val('')
        }
    }else{
        noteText.attr("placeholder", "Notes with empty text not allowed...!");
    }
}
Template.viewNotes.notes = function(){
    return Notes.find({},{sort:{time:-1}});
}