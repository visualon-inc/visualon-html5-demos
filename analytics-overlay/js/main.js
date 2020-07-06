var playerContainer_;
var player_ = null;
var playerContext_ = {};
var playerUI_ = null;

var isEnableAnalyticsOverlay = true;
var analyticsInfo;

// UI Elements
var nIntervId;
var idAnalyticsOverlay = null;
var idAnalytics_playerVersion = null;
var idAnalytics_startupTime = null;
var idAnalytics_playTime = null;
var idAnalytics_streamType = null;
var idAnalytics_bufferingTime = null;
var idAnalytics_resolution = null;
var idAnalytics_bandwidth = null;
var idAnalytics_aveBandwidth = null;
var idAnalytics_playlistBitrate = null;
var idAnalytics_streamingFps = null;
var idAnalytics_adaptations = null;
var idAnalytics_totalFrames = null;
var idAnalytics_droppedFrames = null;
var idAnalytics_downloadTime = null;
var idAnalytics_downloadBytes = null;
var idAnalytics_droppedBytes = null;
var idAnalytics_videoLinkURL = null;

function initUI() {
  idAnalyticsOverlay = document.getElementById('idAnalyticsOverlay');
  idAnalytics_playerVersion = document.getElementById('idAnalytics_playerVersion');
  idAnalytics_startupTime = document.getElementById('idAnalytics_startupTime');
  idAnalytics_playTime = document.getElementById('idAnalytics_playTime');
  idAnalytics_streamType = document.getElementById('idAnalytics_streamType');
  idAnalytics_bufferingTime = document.getElementById('idAnalytics_bufferingTime');
  idAnalytics_resolution = document.getElementById('idAnalytics_resolution');
  idAnalytics_bandwidth = document.getElementById('idAnalytics_bandwidth');
  idAnalytics_aveBandwidth = document.getElementById('idAnalytics_aveBandwidth');
  idAnalytics_playlistBitrate = document.getElementById('idAnalytics_playlistBitrate');
  idAnalytics_streamingFps = document.getElementById('idAnalytics_streamingFps');
  idAnalytics_adaptations = document.getElementById('idAnalytics_adaptations');
  idAnalytics_totalFrames = document.getElementById('idAnalytics_totalFrames');
  idAnalytics_droppedFrames = document.getElementById('idAnalytics_droppedFrames');
  idAnalytics_downloadTime = document.getElementById('idAnalytics_downloadTime');
  idAnalytics_downloadBytes = document.getElementById('idAnalytics_downloadBytes');
  idAnalytics_droppedBytes = document.getElementById('idAnalytics_droppedBytes');
  idAnalytics_videoLinkURL = document.getElementById('idAnalytics_videoLinkURL');
  idAnalyticsOverlay.style.display = 'block';
};

function onPlayerOpenFinished() {
  if (isEnableAnalyticsOverlay) {
    if (nIntervId) {
      clearInterval(nIntervId);
    }
    nIntervId = setInterval(updateAnaylicsInfo, 3000);
  }
};

function onFullscreenChanged() {
  if (!idAnalyticsOverlay)
    return;
  var flagIsFullscreen = player_.isFullscreen();

  if (flagIsFullscreen) {
    idAnalyticsOverlay.classList.add("vop-fullscreen-analyticsoverlay");
    idAnalyticsOverlay.classList.remove("vop-normal-analyticsoverlay");
  } else {
    idAnalyticsOverlay.classList.remove("vop-fullscreen-analyticsoverlay");
    idAnalyticsOverlay.classList.add("vop-normal-analyticsoverlay");
  }
}


function setAnalyticsTrackInfo() {
  if (!isEnableAnalyticsOverlay || !analyticsInfo) {
    return;
  }

  // Update analytics info
  if (idAnalytics_playerVersion) {
    idAnalytics_playerVersion.innerText = analyticsInfo.playerVersion;
  }
  if (idAnalytics_startupTime) {
    idAnalytics_startupTime.innerText = analyticsInfo.startupTime;
  }
  if (idAnalytics_playTime) {
    idAnalytics_playTime.innerText = analyticsInfo.playTime;
  }
  if (idAnalytics_streamType) {
    idAnalytics_streamType.innerText = analyticsInfo.streamType;
  }
  if (idAnalytics_bufferingTime) {
    idAnalytics_bufferingTime.innerText = analyticsInfo.bufferingTime;
  }
  if (idAnalytics_resolution) {
    idAnalytics_resolution.innerText = analyticsInfo.resolution;
  }
  if (idAnalytics_bandwidth) {
    idAnalytics_bandwidth.innerText = analyticsInfo.bandwidth;
  }
  if (idAnalytics_aveBandwidth) {
    idAnalytics_aveBandwidth.innerText = analyticsInfo.aveBandwidth;
  }
  if (idAnalytics_playlistBitrate) {
    idAnalytics_playlistBitrate.innerText = analyticsInfo.playlistBitrate;
  }
  if (idAnalytics_streamingFps) {
    idAnalytics_streamingFps.innerText = analyticsInfo.streamingFps;
  }
  if (idAnalytics_adaptations) {
    idAnalytics_adaptations.innerText = analyticsInfo.adaptations;
  }
  if (idAnalytics_totalFrames) {
    idAnalytics_totalFrames.innerText = analyticsInfo.totalFrames;
  }
  if (idAnalytics_droppedFrames) {
    idAnalytics_droppedFrames.innerText = analyticsInfo.droppedFrames;
  }
  if (idAnalytics_downloadTime) {
    idAnalytics_downloadTime.innerText = analyticsInfo.downloadTime;
  }
  if (idAnalytics_downloadBytes) {
    idAnalytics_downloadBytes.innerText = analyticsInfo.downloadBytes;
  }
  if (idAnalytics_droppedBytes) {
    idAnalytics_droppedBytes.innerText = analyticsInfo.droppedBytes;
  }
  if (idAnalytics_videoLinkURL) {
    idAnalytics_videoLinkURL.innerText = analyticsInfo.videoLinkURL;
  }
};

function updateAnaylicsInfo() {
  analyticsInfo = player_.getAnalyticsInfo();
  if (!analyticsInfo) {
    return;
  }

  setAnalyticsTrackInfo();
};

function initPlayer() {
  playerContainer_ = document.getElementById('player-container');
  // build player
  player_ = new voPlayer.Player(playerContainer_);
  player_.addPlugin(voPlayer.voAnalyticsPlugin);
  player_.init(common_config);
  player_.addEventListener(voPlayer.events.VO_OSMP_SRC_CB_OPEN_FINISHED, onPlayerOpenFinished, playerContext_);
  player_.addEventListener(voPlayer.events.VO_OSMP_FULLSCREEN_CHANGE, onFullscreenChanged, playerContext_);

  // attach ui engine
  playerUI_ = new voPlayer.UIEngine(player_);
  playerUI_.buildUI();

  player_.open(DASH_Clear_stream);
}

window.onload = function () {
  initUI();
  initPlayer();
};
