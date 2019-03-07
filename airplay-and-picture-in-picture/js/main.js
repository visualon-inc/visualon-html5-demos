var airplayUI = Object.create(CommonUI);

airplayUI.initVariable = function() {
  CommonUI.initVariable.call(this);

  this.flagPipSupported = false;
  this.vopAirplayBtn = null;
  this.vopPipBtn = null;
};

airplayUI.initUI = function() {
  CommonUI.initUI.call(this);

  this.vopAirplayBtn = document.querySelector('.vop-airplay-button');
  this.vopPipBtn = document.querySelector('.vop-pip-button');

  this.vopAirplayBtn.style.display = 'none';
};

airplayUI.initUIEventListeners = function() {
  CommonUI.initUIEventListeners.call(this);

  this.vopAirplayBtn.addEventListener('click', this.onAirplayClick.bind(this));
  this.vopPipBtn.addEventListener('click', this.onPipClick.bind(this));
};

airplayUI.initPlayer = function(config) {
  CommonUI.initPlayer.call(this, config);

  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_AIRPLAY_AVAILABILITY_CHANGED,
    this.onAirplayAvailabilityChanged.bind(this), this.context);

  if (this.player_.isPipSupported) {
    this.flagPipSupported = this.player_.isPipSupported();
    if (!this.flagPipSupported) {
      this.vopPipBtn.style.display = 'none';
    } else {
      this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PIP_MODE_CHANGED,
        this.onPipModeChanged.bind(this), this.context);
    }
  }
};

airplayUI.onAirplayAvailabilityChanged = function(e) {
  printLog('onAirplayAvailabilityChanged: ' + e.changedevent.availability);
  if (e.changedevent.availability) {
    this.vopAirplayBtn.style.display = 'inline-block';
  } else {
    this.vopAirplayBtn.style.display = 'none';
  }
}

airplayUI.onPipModeChanged = function() {
  printLog('onPipModeChanged: ' + this.player_.isInPipMode());

  if (this.player_.isInPipMode) {
    if (this.player_.isInPipMode()) {
      this.vopPipBtn.title = 'Exit picture in picture';
      this.vopPipBtn.innerHTML = 'settings_overscan';
    } else {
      this.vopPipBtn.title = 'Enter picture in picture';
      this.vopPipBtn.innerHTML = 'picture_in_picture';
    }
  }
}

airplayUI.onAirplayClick = function() {
  printLog('onAirplayClick');

  if (this.player_.showPlaybackTargetPicker) {
    this.player_.showPlaybackTargetPicker();
  }
}

airplayUI.onPipClick = function() {
  printLog('onPipClick');

  if (this.player_.setPipPresentation && this.player_.isInPipMode) {
    this.player_.setPipPresentation(!this.player_.isInPipMode());
  }
};

airplayUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(common_config);
};

window.onload = function() {
  airplayUI.onload();
  airplayUI.open(Airplay_Pip_stream);
};

window.onunload = function() {};