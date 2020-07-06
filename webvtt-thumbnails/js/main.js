var playerContainer_;
var player_ = null;
var playerUI_ = null;

window.onload = function () {
  playerContainer_ = document.getElementById('player-container');
  // build player
  player_ = new voPlayer.Player(playerContainer_);
  player_.addPlugin(voPlayer.voAnalyticsPlugin);
  player_.addPlugin(voPlayer.voVttThumbnailPlugin);
  player_.init(common_config);

  // attach ui engine
  playerUI_ = new voPlayer.UIEngine(player_);
  playerUI_.buildUI();

  player_.open(Webvtt_Thumbnail_stream);
};
