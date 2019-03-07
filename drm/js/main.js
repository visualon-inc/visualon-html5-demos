var drmUI = Object.create(CommonUI);

drmUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(common_config);
  checkMSE();
  var browser = BrowserDetect.OS + BrowserDetect.browser

  // Internet Explorer 6-11
  var isIE = (BrowserDetect.browser === 'MSIE');

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  document.getElementById("widevine").checked = false;
  document.getElementById("playready").checked = false;
  document.getElementById("fairplay").checked = false;
  if (isEdge || isIE) {
    this.open(DRM_stream_pr);
    document.getElementById("playready").checked = true;
  } else if (SupportMatrix.Widevine.indexOf(browser) > -1) {
    this.open(DRM_stream_wv);
    document.getElementById("widevine").checked = true;
  } else if (SupportMatrix.FairPlay.indexOf(browser) > -1) {
    document.getElementById("fairplay").checked = true;
    document.getElementById("idBtnController").style.display = 'block';
  } else
    this.open(HLS_Clear_stream);
};

drmUI.onBtnOpen = function() {
  var v = document.getElementById('idUrl');
  var la = document.getElementById('laUrl');
  var cert = document.getElementById('cert');
  var link = {};
  link.uri = v.value;
  link.drm = {};
  link.drm.fairplay = {};
  link.drm.fairplay.laUrl = la.value;
  link.drm.fairplay.certificateUrl = cert.value;
  var DRM_stream_fp = {};
  DRM_stream_fp.links = [];
  DRM_stream_fp.links.push(link);
  this.open(DRM_stream_fp);
};

window.onload = function() {
  drmUI.onload();
};

window.onunload = function() {};