// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

PayloadBot = {
  storedData : 0,
  channel_max: 10,
  audiochannels: [],
  thistime: 0,
  blastOff: function(){
    this.setupAudioChannel();
    this.events();
  },
  events: function(){
    var $button = $('.interval-button');
    var self = this;
    $button.on('click', function(e){
      // console.log('button pressed');
      e.preventDefault();
      if($button.hasClass('pressed')){
        self.stopInterval();
        $button.html('Start Interval');
        $button.removeClass('pressed');
      } else {
        self.startInterval();
        $button.addClass('pressed');
        $button.html('Stop Interval');
      }
    });
  },
  startInterval: function(){
    var self = this;
    this.interval = window.setInterval(function(){
      self.checkPR();
    }, 250);
  },
  stopInterval: function(){
    var self = this;
    clearInterval(self.interval);
  },
  setupAudioChannel: function(){
    var self = this;
    for (a=0;a<self.channel_max;a++) {                 // prepare the channels
      self.audiochannels[a] = new Array();
      self.audiochannels[a]['channel'] = new Audio();            // create a new audio object
      self.audiochannels[a]['finished'] = -1;              // expected end time for this channel
    }
  },
  play_multi_sound: function(s) {
    var self = this;
    for (a=0;a<self.audiochannels.length;a++) {
      self.thistime = new Date();
      if (self.audiochannels[a]['finished'] < self.thistime.getTime()) {      // is this channel finished?
        self.audiochannels[a]['finished'] = self.thistime.getTime() + document.getElementById(s).duration*1000;
        self.audiochannels[a]['channel'].src = document.getElementById(s).src;
        self.audiochannels[a]['channel'].load();
        self.audiochannels[a]['channel'].play();
        break;
      }
    }
  },
  checkPR: function(){
    if( location.origin.indexOf('nypullrequest') !== false ){
      var url = location.origin + '/update';
      this.getFromServer(url);
    }
  },
  getFromServer: function(url){
    var self = this;
    $.ajax({
     type: 'GET',
     url: url,
     success: function(data, textStatus, request){
        // console.log(self.storedData);
        // console.log(data.count);
        if(self.storedData < data.count){
          self.processPayload(data, textStatus, request);
          self.storedData = data.count;
        }
     }
    });
  },
  processPayload: function(data, textStatus, request){
    var payloadEvent = request.getResponseHeader('X-GitHub-Event');
    var self = this;
    switch (payloadEvent){
      case 'push': 
        console.log("case 'push':");
        self.play_multi_sound('push-sound');
      case 'release': 
        console.log("case 'release':");
        self.play_multi_sound('release-sound');
      case 'create': 
        console.log("case 'create':");
        self.play_multi_sound('branch-sound');
      case 'issue_comment': 
        console.log("case 'issue_comment':");
        self.play_multi_sound('comment-sound');
      case 'pull_request': 
        console.log("case 'pull_request':");
        self.play_multi_sound('pull-request-sound');
      default:
        console.log("default");
        self.play_multi_sound('default-sound');
    }
  }
};

$(document).on('ready', function(){PayloadBot.blastOff()});