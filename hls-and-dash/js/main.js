var playerContainer_;
var player_ = null;
var playerUI_ = null;

function onProtocolChange() {
  var proc = document.getElementById('protocol').value;
  if (proc === 'HLS')
    player_.open(HLS_Clear_stream);
  else if (supportDASH()) {
    player_.open(DASH_Clear_stream);
  } else {
    alert(proc + ' is not supported');
  }
};

window.onload = function () {
  checkMSE()

  //
  playerContainer_ = document.getElementById('player-container');
  // build player
  player_ = new voPlayer.Player(playerContainer_);
  player_.addPlugin(voPlayer.voAnalyticsPlugin);
  player_.init(common_config);

  // attach ui engine
  playerUI_ = new voPlayer.UIEngine(player_);
  playerUI_.buildUI();

  onProtocolChange();
};
