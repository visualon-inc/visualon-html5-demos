var playerContainer_;
var player_ = null;
var playerUI_ = null;

function onBtnOpen() {
  var v = document.getElementById('idUrl');
  var la = document.getElementById('laUrl');
  var cert = document.getElementById('cert');
  var link = {};
  link.uri = v.value;
  link.type = 'hls';
  link.drm = {};
  link.drm.fairplay = {};
  link.drm.fairplay.laUrl = la.value;
  link.drm.fairplay.certificateUrl = cert.value;
  var DRM_stream_fp = {};
  DRM_stream_fp.links = [];
  DRM_stream_fp.links.push(link);

  player_.open(DRM_stream_fp);
};

window.onload = function() {
  var targetSource;
  // set drm states
  checkMSE();

  document.getElementById("widevine").checked = false;
  document.getElementById("playready").checked = false;
  document.getElementById("fairplay").checked = false;

  // build player
  playerContainer_ = document.getElementById('player-container');

  player_ = new voPlayer.Player(playerContainer_);
  player_.addPlugin(voPlayer.voAnalyticsPlugin);
  player_.addPlugin(voPlayer.voPolyfillPlugin);
  player_.init(common_config);

  // attach ui engine
  playerUI_ = new voPlayer.UIEngine(player_);
  playerUI_.buildUI();

  player_.getSupportedDRMTypes().then( function(supportedDRM) {
    if (supportedDRM.indexOf('widevine') > -1) {
      targetSource = targetSource? targetSource : DRM_stream_wv;
      document.getElementById("widevine").checked = true;
    }
    if (supportedDRM.indexOf('playready') > -1) {
      targetSource = targetSource? targetSource : DRM_stream_pr;
      document.getElementById("playready").checked = true;
    }
    if (supportedDRM.indexOf('fairplay') > -1) {
      document.getElementById("fairplay").checked = true;
      document.getElementById("idBtnController").style.display = 'block';
    }
    if (supportedDRM.length === 0) {
      targetSource = targetSource? targetSource : HLS_Clear_stream;
    }

    if (targetSource) {
      player_.open(targetSource);
    }
  })
};
