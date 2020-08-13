var streamLowlatency = {
  links: [{
    uri: 'https://livesim.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
    type: 'dash'
  }],
  advanced: {
    lowLatencyMode: true
  }
};
var streamNormal = {
  links: [{
    uri: 'https://livesim.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
    type: 'dash'
  }],
  advanced: {
    lowLatencyMode: false
  }
};

var playerLowlatency = null;
var playerNormal = null;

function initPlayerLowlatency() {
  var playerContainer = document.getElementById('player-container-lowlatency');
  // build player
  playerLowlatency = new voPlayer.Player(playerContainer);
  playerLowlatency.addPlugin(voPlayer.voAnalyticsPlugin);
  playerLowlatency.init(common_config);

  // attach ui engine
  var playerUI = new voPlayer.UIEngine(playerLowlatency);
  playerUI.buildUI();
}

function initPlayerNormal() {
  var playerContainer = document.getElementById('player-container-normal');
  // build player
  playerNormal = new voPlayer.Player(playerContainer);
  playerNormal.addPlugin(voPlayer.voAnalyticsPlugin);
  playerNormal.init(common_config);

  // attach ui engine
  var playerUI = new voPlayer.UIEngine(playerNormal);
  playerUI.buildUI();
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

function onClickLoadStream() {
  playerLowlatency.open(streamLowlatency);
  playerNormal.open(streamNormal);

  window.setInterval(updateWallClockUI, 100);
}

window.onload = function () {
  initPlayerLowlatency();
  initPlayerNormal();
};




