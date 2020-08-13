"use strict";


var playerContainer_;
var sourceCfg_;
var player_ = null;
var playerUI_ = null;

sourceCfg_ = {
  links: [{
    uri: 'https://d1w9xdakxie2rx.cloudfront.net/html5/hls/playlist.m3u8',
    type: 'hls'
  }]
};

playerContainer_ = document.getElementById('player-container');
// build player
player_ = new voPlayer.Player(playerContainer_);
player_.addPlugin(voPlayer.voVideoEnhancePlugin);
player_.init(common_config);

// attach ui engine
playerUI_ = new voPlayer.UIEngine(player_);
playerUI_.buildUI();

//should add spit element in control bar container, or the mouse event such as 'mouseleave' can not been processed rightly on control bar.
{
    var spitDiv = document.createElement('div');
    spitDiv.setAttribute('class', 'ba-slider');
    var spitEle = document.createElement('span');
    spitEle.setAttribute('id', 'split-handle');
    spitEle.setAttribute('class', 'handle');
    spitDiv.appendChild(this.spitEle);
    
    var skinContainer = document.getElementsByClassName('vop-skin-container');
    skinContainer[0].appendChild(spitDiv);
}

var split_ratio = 2;
var prev_split_ratio = 0.5;
var mode = 'enhance';
var speed = 'ultraFast';
var level = 50;

var spliterInited = false;
$('#split').change(function () {
  const split = $(this).prop('checked')
  if (split) {
    if (!spliterInited) {
      $('.ba-slider').each(function () {
        var cur = $(this);
        drags(cur.find('.handle'), cur, function(r) { 
          split_ratio = r
          player_.VideoEnhance.setSplitRatio(split_ratio);
        });
      });
      spliterInited = true;
    }
    $('#split-handle').show()
    split_ratio = prev_split_ratio;
  } else {
    $('#split-handle').hide()
    if (spliterInited)
      prev_split_ratio = split_ratio;
    split_ratio = 0;
  }
  player_.VideoEnhance.setSplitRatio(split_ratio);
}).trigger('change')

$('#videoSelector').change(function () {
  if (!player_.VideoEnhance.isVideoEnhanceSupported()) {
    alert("The browser does not support Video Enhancement.");
    return;
  }

  player_.close();
  sourceCfg_.links[0].uri = $(this).val();
  sourceCfg_.links[0].type = $(this).find(':selected').data('type');
  player_.open(sourceCfg_);
  setTimeout(function(){
    player_.VideoEnhance.setLowBacklightEnhanceLevel(level);
  },3000);
}).trigger('change')

$("#modes input:radio").change(function () {
  mode = $(this).attr('id')
  switch (mode) {
    case 'enhance':
      $('#canvas').show()
      player_.VideoEnhance.setLowBacklightEnhanceLevel(level);
      break;
    default:
      $('#canvas').hide()
      player_.VideoEnhance.setLowBacklightEnhanceLevel(0);
      break;
  }
})

$("#speed input:radio").change(function () {
  speed = $(this).attr('id')
  player_.VideoEnhance.setEnhanceSpeed(speed);
})

$('#video2').click(function (e) {
  if (e.target.className == 'handle')
    return;

  // Get current play/pause state from UI.
  let currPaused = player_.isPaused();
  let currEnded = player_.isEnded();
  let isTrickPlay = player_.getTrickPlayRate() != 1;

  if(isTrickPlay)
    player_.setTrickPlayRate(1);

  let newPaused;
  // compute new play/pause state and apply it to player.
  if (currEnded) {
    // call play method when video is ended will trigger 'seeking' event and the target position is 0.
    newPaused = false;
  } else {
    // execute ui cmd
    if (currPaused) {
      newPaused = false;
    } else {
      newPaused = true;
    }
  }

  if (newPaused) {
    player_.pause();
  } else {
    let result = player_.play()
    if (result && (typeof Promise !== 'undefined') && (result instanceof Promise)) {
      result.then(function(){console.log('play successfully')}).catch(function(error){console.log(error)});
    }
  }
})
