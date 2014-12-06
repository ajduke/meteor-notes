// rendered goes here
Template.inputForm.rendered = function(){
  $('#noteTag').tagsinput({
    maxTags: 3,
  });
}

// helpers goes here
Template.input_note.helpers({
  templateName: function(){
    return Session.get('current_template')
  },

  isLoggedIn: function () {
    return Meteor.userId();
  }
})

Template.viewNotes.helpers({
  notes: function() {
    var selectedTag = Session.get("selectedTag");
    return  selectedTag ? Notes.find({tags: selectedTag}, {sort: {time: -1}}) : Notes.find({}, {sort: {time: -1}});
  },

  localTime: function() {
    var utcTime = new Date(this.time);
    var formattedStr = formatAMPM(utcTime)
    return formattedStr;
  },

  selectedTag: function () {
    return Session.get('selectedTag');
  },

})

Template.tagCloud.helpers({
  availableTags: function () {
    return Tags.find({}, {sort: {count: -1}});
  }
})

Template.tagCloud.events ({
  'click .tgname': function (event) {
    var anch = $(event.currentTarget);
    var asd = anch.find('.tagName');
    Session.set("selectedTag", asd.text().trim());
  }
})

Template.viewNotes.events ({
  'click .all': function (event) {
    Session.set('selectedTag', '');
  },

  'click .del': function (event) {
    var id = this._id;
    if (id) {
      Meteor.call('deleteNote', id);
    }
  },
  'click .tgs': function (event) {
    var anch = $(event.target);
    Session.set("selectedTag", anch.text().trim());
  },
  'mouseover div.thumbnail .txt': function (event) {
//        var c = $(event.target);
//
//        console.log('Hover called '+event.target);
//        var t = c.prev('.lnk');
//        t.removeClass('hide')
//        t.addClass('show');

  },
  'mouseout div.thumbnail .txt': function (event) {
//        var c = $(event.target);
//        console.log('Hover Out called');
//        var t = c.prev('.lnk');
//        t.removeClass('show');
//        t.addClass('hide');
  }

})

Template.inputForm.events({
  'keydown input#noteText': function (event) {
    if (event.which == 13) { // 13 is the enter key event
      $("#btn").trigger('click')
    }
  },

  'click #btn': function (event) {
    var noteText = $('#noteText');
    var $noteTag = $('#noteTag');

    if (noteText.val() != '') {
      var nodeTag = $noteTag.val();
      tagsArr = nodeTag.split(',');
      if (tagsArr.length <= 3) {
        var ownerId = Session.get('userId');
        nodeTag = nodeTag === '' ? 'untagged' : nodeTag;
        Meteor.call('saveNote', noteText.val(), nodeTag, ownerId);
        noteText.val('');
        $noteTag.val('');
        $noteTag.tagsinput('removeAll');
      } else {
        $noteTag.val('');
        $noteTag.tagsinput('removeAll');
        $noteTag.attr("placeholder", "Only upto 3 tags are allowed....!");
      }
      noteText.attr("placeholder", "Enter the note details");
    } else {
      noteText.attr("placeholder", "Notes with empty text not allowed...!");
    }
  }
});




// function required are put here
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
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = day + ", " + month + " " + date + " " + year + ", " + hours + ':' + minutes + ' ' + ampm;
  return strTime;
}