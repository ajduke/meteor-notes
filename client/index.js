Notes = new Meteor.Collection("notes");

Router.map( function () {
        this.route('home');
        this.route('logInTemplate', {
            path: '/'
        });
}); // end of router map

Meteor.startup( function () {
    $('#noteTag').tagsinput({
        maxTags: 3
    });

    Session.set("selectedTag", null);

    Meteor.autorun(function() {
        Meteor.subscribe("notes", Session.get("selectedTag"));
    });

//    Meteor.subscribe('notes');
}); // end of startup

Meteor.autorun(function () {
    if (Meteor.userId()) {
        Router.go('/home');
        console.log('User logged in');
    } else {
        Router.go('/');
        console.log('User logged out');
    }
});

Template.tagCloud.helpers={
    selectedTag : function() {
        console.log(Session.get('selectedTag'))
        return Session.get('selectedTag');
    }

};

Template.tagCloud.events={
    'click .del' : function(event){

    }

}

Template.viewNotes.events = {
    'click .del' : function(event){
        var id= this._id;
        console.log('delete called '+id)
        if(id){
            Meteor.call('deleteNote',id);
        }
    },
    'click .tgs' : function(event){
        var anch = $(event.target);
        console.log(anch.text())
        Session.set("selectedTag", anch.text().trim());
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
        saveNotes(event)
    },
    'keydown input#noteText' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
            saveNotes(event)
        }
    }
}

function saveNotes(event){
    var name = 'AAAA';
    var noteText = $('#noteText');
    var $noteTag = $('#noteTag');

    if (noteText.val() != '') {
        var nodeTag = $noteTag.val();
        tagsArr = nodeTag.split(',');
        if(tagsArr.length <=3){
            Meteor.call('saveNote', name, noteText.val(),nodeTag );
            noteText.val('');
            $noteTag.val('');
            $noteTag.tagsinput('removeAll');
        }else {
            $noteTag.attr("placeholder", "Only upto 3 tags are allowed....!");
            $noteTag.val('')
            $noteTag.tagsinput('removeAll');
        }
        noteText.attr("placeholder", "Enter the note details");
    }else{
        noteText.attr("placeholder", "Notes with empty text not allowed...!");
    }
}

Template.viewNotes.notes = function(){
    return Notes.find({},{sort:{time:-1}});
}