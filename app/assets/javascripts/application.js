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
    this.setUpSpeech();
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
    console.log('Started');
    var self = this;
    this.interval = window.setInterval(function(){
      self.checkPR();
    }, 250);
  },
  stopInterval: function(){
    console.log('Stopped');
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
    var url = location.origin + '/update';
    this.getFromServer(url);
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
  setUpSpeech: function(){
    this.voices = speechSynthesis.getVoices();
    this.voiceList = [];
    this.voices.forEach(function(voice, i) {
      this.voiceList.push(voice.name);
    });
  },
  checkSay: function(data){
    if(data.last_comment !== undefined && data.last_comment.indexOf("#say") > -1){
      var comment = data.last_comment.replace('#say', '');
      var msg = new SpeechSynthesisUtterance(comment);
      if(data.last_comment.indexOf("#voice") > -1){
        data.last_comment = data.last_comment.replace('#voice', '');
        var voice = data.last_comment[0]
        msg.voice = speechSynthesis.getVoices()[voice];
      }
      window.speechSynthesis.speak(msg);
    }
  },
  processPayload: function(data, textStatus, request){
    console.log(data.last_payload);
    var self = this;
    switch (data.last_payload){
      case 'push': 
        console.log("Event: push");
        self.play_multi_sound('push-sound');
        break;
      case 'release': 
        console.log("Event: release");
        self.play_multi_sound('release-sound');
        break;
      case 'create': 
        console.log("Event: create");
        self.play_multi_sound('branch-sound');
        break;
      case 'issue_comment': 
        console.log("Event: issue_comment");
        console.log(data);
        self.checkSay(data);
        self.play_multi_sound('comment-sound');
        break;
      case 'pull_request': 
        console.log("Event: pull_request");
        self.play_multi_sound('pull-request-sound');
        break;
      default:
        console.log("Event: default");
        self.play_multi_sound('default-sound');
    }
  }
};

$(document).on('ready', function(){
  PayloadBot.blastOff()
});