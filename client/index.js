Notes = new Meteor.Collection("notes");
Tags = new Meteor.Collection("tags");

//Router.map( function () {
//        this.route('home');
//        this.route('logInTemplate', {
//            path: '/'
//        });
//}); // end of router map

Meteor.startup( function () {
    $('#noteTag').tagsinput({
        maxTags: 3
    });

    Session.set("selectedTag", null);

    Meteor.autorun(function() {
        Meteor.subscribe("notes", Session.get("selectedTag"));

    });

    Meteor.subscribe("tags");
}); // end of startup

// Handlebars if eq helper definition
Handlebars.registerHelper('if_eq', function(ownerId,  opts) {
    if(ownerId === Meteor.userId()){
        return opts.fn(this);
    }  else{
        return opts.inverse(this);
    }
});

Meteor.autorun(function () {
    if (Meteor.userId()) {
//        Router.go('/home');
        console.log('User logged in');
        Session.set('userId',Meteor.userId());
    } else {
//        Router.go('/');
        console.log('User logged out');
        Session.set('userId','');
    }
});

Template.viewNotes.notes = function(){
    return Notes.find({},{sort:{time:-1}});
}

Template.viewNotes.localTime = function(){
    var utcTime = new Date(this.time);
    var formattedStr = formatAMPM(utcTime)
    return formattedStr;
};

var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

function formatAMPM(dateObj) {
    var day = dayNames[dateObj.getDay()];
    var date = dateObj.getDate();
    var month = monthNames[dateObj.getMonth()];
    var year = dateObj.getFullYear();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = day + ", " + month + " " + date + " " + year + ", " + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

Template.tagCloud.availableTags= function() {
    return Tags.find();
};

Template.tagAlert.selectedTag= function() {
        return Session.get('selectedTag');
    };

Template.tagAlert.events = {
    'click .all' : function(event){
        Session.set('selectedTag','');
    }
}

Template.tagCloud.events = {
    'click .tgname' : function(event){
        var anch = $(event.target);
        Session.set("selectedTag", anch.text().trim());
    }
}
Template.viewNotes.events = {
    'click .del' : function(event){
        var id= this._id;
        if(id){
            Meteor.call('deleteNote',id);
        }
    },
    'click .tgs' : function(event){
        var anch = $(event.target);
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
Template.inputForm.isLoggedIn = function(){
  return Meteor.userId();
};

Template.inputNote.events = {
    'click #btn' : function(event){
        saveNotes(event)
    },
    'keydown input#noteText' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
            saveNotes(event)
        }
    }
};

function saveNotes(event){

    var noteText = $('#noteText');
    var $noteTag = $('#noteTag');

    if (noteText.val() != '') {
        var nodeTag = $noteTag.val();
        tagsArr = nodeTag.split(',');
        if(tagsArr.length <=3) {
            var ownerId=Session.get('userId');
            nodeTag= nodeTag ==='' ? null: nodeTag;
            Meteor.call('saveNote', noteText.val(),nodeTag, ownerId);
            noteText.val('');
            $noteTag.val('');
            $noteTag.tagsinput('removeAll');
        }else {
            $noteTag.attr("placeholder", "Only upto 3 tags are allowed....!");
            $noteTag.val('');
            $noteTag.tagsinput('removeAll');
        }
        noteText.attr("placeholder", "Enter the note details");
    }else{
        noteText.attr("placeholder", "Notes with empty text not allowed...!");
    }
}

