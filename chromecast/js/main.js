var playerContainer_;
var player_ = null;
var playerUI_ = null;

window.onload = function () {
  playerContainer_ = document.getElementById('player-container');
  // build player
  player_ = new voPlayer.Player(playerContainer_);
  player_.addPlugin(voPlayer.voAnalyticsPlugin);
  player_.addPlugin(voPlayer.voCastSenderPlugin);
  player_.init(Chromecast_config);

  // attach ui engine
  playerUI_ = new voPlayer.UIEngine(player_);
  playerUI_.buildUI();

  player_.open(Chromecast_stream);
};
