var analyticsOverlayUI = Object.create(CommonUI);

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

analyticsOverlayUI.initUI = function() {
  CommonUI.initUI.call(analyticsOverlayUI);
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

analyticsOverlayUI.onOpenFinished = function() {
  CommonUI.onOpenFinished.call(analyticsOverlayUI);

  if (isEnableAnalyticsOverlay) {
    if (nIntervId) {
      clearInterval(nIntervId);
    }
    nIntervId = setInterval(analyticsOverlayUI.updateAnaylicsInfo.bind(analyticsOverlayUI), 3000);
  }
};

analyticsOverlayUI.onFullScreenChange = function() {
  if (isFullscreen()) {
    if (!UITools.hasClass(this.vopPlayer, 'vop-fullscreen')) {
      UITools.addClass(this.vopPlayer, 'vop-fullscreen');
    }
  } else {
    if (UITools.hasClass(this.vopPlayer, 'vop-fullscreen')) {
      UITools.removeClass(this.vopPlayer, 'vop-fullscreen');
    }
  }
};

analyticsOverlayUI.initFullscreenChangeListener = function() {
  this.onFullScreenChange = this.onFullScreenChange.bind(this);
  // fullscreen listener
  document.addEventListener("fullscreenchange", this.onFullScreenChange);
  document.addEventListener("mozfullscreenchange", this.onFullScreenChange);
  document.addEventListener("webkitfullscreenchange", this.onFullScreenChange);
  document.addEventListener("msfullscreenchange", this.onFullScreenChange);
  document.addEventListener("MSFullscreenChange", this.onFullScreenChange);
};

analyticsOverlayUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(common_config);
  this.initFullscreenChangeListener();
  checkMSE()
};

analyticsOverlayUI.setAnalyticsTrackInfo = function() {
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

analyticsOverlayUI.updateAnaylicsInfo = function() {
  analyticsInfo = this.player_.getAnalyticsInfo();
  if (!analyticsInfo) {
    return;
  }

  analyticsOverlayUI.setAnalyticsTrackInfo();
};

window.onload = function() {
  analyticsOverlayUI.onload();
  analyticsOverlayUI.open(DASH_Clear_stream);
};

window.onunload = function() {};