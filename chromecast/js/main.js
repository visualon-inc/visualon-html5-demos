var chromecastUI = Object.create(CommonUI);

chromecastUI.initVariable = function() {
  CommonUI.initVariable.call(this);
  this.vopRemoteDisplayContainer = null;
  this.vopRemoteDisplayText = null;
};

chromecastUI.initUI = function() {
  CommonUI.initUI.call(this);

  this.vopRemoteDisplayContainer = document.querySelector('.vop-remote-display-container');
  this.vopRemoteDisplayText = document.querySelector('.vop-remote-display-status-text');
};

chromecastUI.initPlayer = function(config) {
  CommonUI.initPlayer.call(this, config);

  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_CAST_CONNECTED, this.onCastConnected.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_CAST_DISCONNECTED, this.onCastDisconnected.bind(this), this.context);
};

chromecastUI.onCastConnected = function(e) {
  this.vopRemoteDisplayText.innerText = 'Playing on ' + e.deviceName;
  this.vopRemoteDisplayContainer.style.display = 'block';
};

chromecastUI.onCastDisconnected = function() {
  this.vopRemoteDisplayContainer.style.display = 'none';
};

chromecastUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(Chromecast_config);
};

window.onload = function() {
  chromecastUI.onload();
  chromecastUI.open(Chromecast_stream);
};

window.onunload = function() {};