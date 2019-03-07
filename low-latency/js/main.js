var context = {};

var vopLowlatencyContainer;
var playerLowlatency;

var vopNormalContainer;
var playerNormal;

var config = {
  playback: {
    autoPlay: true
  },
  analytics: {
    enable: true,
    cuid: 'VISUALON_CUSTOM_DEMO' // customer specified user ID for Analytics Agent.
  },
  logs: {
    logToConsole: false
  }
};
var streamLowlatency = {
  links: [{
    uri: 'https://vm2.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd'
  }],
  advanced: {
    lowLatencyMode: true
  }
};
var streamNormal = {
  links: [{
    uri: 'https://vm2.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd'
  }],
  advanced: {
    lowLatencyMode: false
  }
};

function onLowlatencyPlayWaiting() {
  if (!$("#idContainerLowlatency").hasClass("vop-buffering")) {
    $("#idContainerLowlatency").addClass("vop-buffering");
  }
}

function onLowlatencyPlayPlaying() {
  if ($("#idContainerLowlatency").hasClass("vop-buffering")) {
    $("#idContainerLowlatency").removeClass("vop-buffering");
  }
}

function initPlayerLowlatency(container) {
  vopLowlatencyContainer = document.getElementById(container);
  playerLowlatency = new voPlayer.Player(vopLowlatencyContainer);

  playerLowlatency.init(config);
  playerLowlatency.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_WAITING, onLowlatencyPlayWaiting, context);
  playerLowlatency.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_PLAYING, onLowlatencyPlayPlaying, context);
}

function onNormalPlayWaiting() {
  if (!$("#idContainerLowlatency").hasClass("vop-buffering")) {
    $("#idContainerLowlatency").addClass("vop-buffering");
  }
}

function onNormalPlayPlaying() {
  if ($("#idContainerNormal").hasClass("vop-buffering")) {
    $("#idContainerNormal").removeClass("vop-buffering");
  }
}

function initPlayerNormal(container) {
  vopNormalContainer = document.getElementById(container);
  playerNormal = new voPlayer.Player(vopNormalContainer);

  playerNormal.init(config);
  playerNormal.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_WAITING, onNormalPlayWaiting, context);
  playerNormal.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_PLAYING, onNormalPlayPlaying, context);
}

function onClickLoadStream() {
  playerLowlatency.open(streamLowlatency);
  playerNormal.open(streamNormal);

  $("#idContainerLowlatency").addClass("vop-buffering");
  $("#idContainerNormal").addClass("vop-buffering");

  window.setInterval(updateWallClockUI, 100);
}

function precision(n, leftAlign, length) {
  var output = n;
  if (n < 10) {
    output = leftAlign ? n + "00" : "00" + n;
  } else if (n < 100) {
    output = leftAlign ? n + "0" : "0" + n;
  }

  return output;
}

function updateWallClockUI() {
  var now = new Date();
  document.getElementById("wallclock").innerHTML =
    "<strong>Wall clock time <br>" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
    ":" + (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()) +
    ":" + precision(now.getMilliseconds(), true) + "</strong>";
}

var resizePlayer = function() {
  var v = document.querySelector('.player');
  var dstWidth = 0;
  var dstHeight = 0;
  if (v.clientWidth > 480) {
    dstWidth = 480;
    dstHeight = dstWidth * 0.5625;
  } else {
    dstWidth = v.clientWidth;
    dstHeight = dstWidth * 0.5625;
  }
  this.vopLowlatencyContainer.style.width = dstWidth.toString() + 'px';
  this.vopLowlatencyContainer.style.height = dstHeight.toString() + 'px';
  this.vopNormalContainer.style.width = dstWidth.toString() + 'px';
  this.vopNormalContainer.style.height = dstHeight.toString() + 'px';
}

window.onload = function() {
  initPlayerLowlatency("idContainerLowlatency");
  initPlayerNormal("idContainerNormal");
  var v = document.querySelector('.player');
  new ResizeSensor(v, resizePlayer.bind(this));
};