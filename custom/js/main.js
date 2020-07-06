var MAXCHAR = 80;
var CHARSIZE = 8;
var customLink = {
  links: [{
    uri: "",
    type: ''
  }]
};

var playerContainer_;
var player_ = null;
var playerContext_ = {};
var playerUI_ = null;

// analytics overlay part
var nIntervId;
var showAnalyticsOverlay = false;
var isEnableAnalyticsOverlay = true;
var analyticsInfo;
var idCheckBoxAnalyticsOverlay = null;

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

var idAssetDASH;
var idAssetHLS;
var idAssetCustom;


function initBroswerType() {
  checkMSE();
  
  var v = document.getElementById('player-container');

  var browser = BrowserDetect.OS + BrowserDetect.browser
  var browserTag = document.getElementById("browserTag");
  browserTag.innerHTML = browser;
  if (BrowserDetect.browser === "Firefox") {
    CHARSIZE = 10;
  }
  MAXCHAR = v.clientWidth / CHARSIZE;
  // Internet Explorer 6-11
  var isIE = (BrowserDetect.browser === 'MSIE');
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  if (isEdge || isIE) {
    if (isIE) {
      browserTag.innerHTML = 'Internet Explorer';
    }
    else {
      browserTag.innerHTML = 'Edge';
    }
    document.getElementById("drmTag").innerHTML = 'Playready';
  } else if (SupportMatrix.Widevine.indexOf(browser) > -1) {
    document.getElementById("drmTag").innerHTML = 'Widevine';
  } else if (SupportMatrix.FairPlay.indexOf(browser) > -1) {
    document.getElementById("drmTag").innerHTML = 'FairPlay';
  } else {
    document.getElementById("drmTag").innerHTML = 'None';
  }
}

function initUI() {
  // init analytics overlay
  idCheckBoxAnalyticsOverlay = document.getElementById('idCheckBoxAnalyticsOverlay');

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

  // test part
  idAssetDASH = document.getElementById('idAssetDASH');
  idAssetHLS = document.getElementById('idAssetHLS');
  idAssetCustom = document.getElementById('idAssetCustom');
  idSelectStreamType = document.getElementById('idSelectStreamType');
  idUrl = document.getElementById('idUrl');
  laUrl = document.getElementById('laUrl');
  cert = document.getElementById('cert');

  idAssetDASH.checked = true;
  onProtocolChange();

  // init browser type
  initBroswerType();
};

function initPlayer() {
  playerContainer_ = document.getElementById('player-container');
  // build player
  player_ = new voPlayer.Player(playerContainer_);
  player_.addPlugin(voPlayer.voAnalyticsPlugin);
  player_.addPlugin(voPlayer.voAdsPlayerPlugin);
  player_.addPlugin(voPlayer.voVttThumbnailPlugin);
  player_.addPlugin(voPlayer.voSRTParserPlugin);
  player_.addPlugin(voPlayer.voCaptionParserPlugin);
  player_.addPlugin(voPlayer.voVTTParserPlugin);
  player_.addPlugin(voPlayer.voTTMLParserPlugin);
  player_.addPlugin(voPlayer.voFCCStylePlugin);
  player_.addPlugin(voPlayer.voSubtitlesPlugin);
  player_.init(common_config);
  player_.addEventListener(voPlayer.events.VO_OSMP_SRC_CB_OPEN_FINISHED, onPlayerOpenFinished, playerContext_);
  player_.addEventListener(voPlayer.events.VO_OSMP_CB_ERROR_EVENTS, onPlayerError, playerContext_);
  player_.addEventListener(voPlayer.events.VO_OSMP_FULLSCREEN_CHANGE, onFullscreenChanged, playerContext_);

  // attach ui engine
  playerUI_ = new voPlayer.UIEngine(player_);
  playerUI_.buildUI();
}

function onPlayerError(event) {
  var errorSession = document.getElementById("error-session");
  errorSession.innerHTML = "ERROR: " + event.message;
  alert("ERROR:" + event.message);
}

function onBtnOpen() {
  if (idAssetCustom.checked) {
    customLink.links[0] = {};
    customLink.links[0].uri = idUrl.value;
    customLink.links[0].type = idSelectStreamType.value;
    var drmTag = document.getElementById('drmTag').innerHTML.toLowerCase();
    customLink.links[0].drm = {};
    customLink.links[0].drm[drmTag] = {};
    customLink.links[0].drm[drmTag].laUrl = laUrl.value;
    customLink.links[0].drm[drmTag].certificateUrl = cert.value;
  }

  player_.open(JSON.parse(JSON.stringify(customLink)));
};

function onProtocolChange() {
  idSelectStreamType.style.display = 'none';
  if (idAssetDASH.checked) {
    idUrl.style.display = "inline";
    laUrl.style.display = 'none';
    cert.style.display = 'none';

    idUrl.value = DASH_Clear_stream.links[0].uri;
    laUrl.value = '';
    cert.value = '';
    customLink = DASH_Clear_stream;
    idUrl.disabled = true;
  } else if (idAssetHLS.checked) {
    idUrl.style.display = "inline";
    laUrl.style.display = 'none';
    cert.style.display = 'none';
    idUrl.value = '';
    laUrl.value = '';
    cert.value = '';
    idUrl.value = HLS_Clear_stream.links[0].uri;
    customLink = HLS_Clear_stream;
    idUrl.disabled = true;
    
  } else if (idAssetCustom.checked) {
    idSelectStreamType.style.display = 'inline';
    idUrl.style.display = "inline";
    laUrl.style.display = 'inline';
    cert.style.display = 'inline';
    idUrl.value = '';
    laUrl.value = '';
    cert.value = '';
    idUrl.disabled = false;
  }
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

setAnalyticsTrackInfo = function() {
  if (!isEnableAnalyticsOverlay || !analyticsInfo) {
    return;
  }

  // Update analytics info to ui
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
}

function onClickAnalyticsOverlay() {
  if (idCheckBoxAnalyticsOverlay.checked) {
    idAnalyticsOverlay.style.display = 'block';
  } else {
    idAnalyticsOverlay.style.display = 'none';
  }
}

window.onload = function() {
  initUI();
  initPlayer();
};

window.onunload = function() {};

