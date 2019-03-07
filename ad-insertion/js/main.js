var adsUI = Object.create(CommonUI);

adsUI.initVariable = function() {
  CommonUI.initVariable.call(this);
  this.flagAdStarted = false;
  this.flagIsLinearAd = false;

  this.adContext = {
    contentWaiting: false,
    currAdType: '-1'
  };
  ads_config.advertising.tag = Single_Inline_Linear;
};

adsUI.createPlayer = function() {
  this.player_ = new voPlayer.Player(this.vopPlayer);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_SRC_CB_OPEN_FINISHED, this.onOpenFinished.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_COMPLETE, this.onPlayComplete.bind(this), this.context);

  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_STARTED, this.onPlayStarted.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_PAUSED, this.onPlayPaused.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_WAITING, this.onPlayWaiting.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_PLAYING, this.onPlayPlaying.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_TIME_UPDATED, this.onPlayTimeUpdated.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_SEEK_COMPLETE, this.onSeekComplete.bind(this), this.context);

  this.player_.addEventListener(voPlayer.events.VO_OSMP_SRC_ADAPTIVE_STREAMING_INFO_EVENT_BITRATE_CHANGE, this.onBitrateChanged.bind(this), this.context);

  this.player_.addEventListener(voPlayer.events.VO_OSMP_SRC_CB_PROGRAM_CHANGED, this.onProgramChanged.bind(this), this.context);

  this.player_.addEventListener(voPlayer.events.VO_OSMP_AD_STARTED, this.onAdStarted.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_AD_COMPLETE, this.onAdComplete.bind(this), this.context);
  this.player_.addEventListener(voPlayer.events.VO_OSMP_AD_COMPANION, this.onAdCompanion.bind(this), this.context);
};

adsUI.initUIEventListeners = function() {
  CommonUI.initUIEventListeners.call(this);
};

adsUI.onPlayerClick = function() {
  if (this.flagAdStarted && this.flagIsLinearAd) {
    return;
  }
  this.onPlayButtonClick();
};

adsUI.updateProgressBarUI = function() {
  if (!this.flagPlayerInited) {
    return;
  }

  var paused = this.player_.isPaused();
  var ended = this.player_.isEnded();

  var streamInfo = this.getStreamInfo();

  var uiBufferedPos;
  var uiPosition;
  var uiDuration;
  var tDisplayText = '';
  if (streamInfo.type === 'live') {
    tDisplayText = 'Live';
  } else if (streamInfo.type === 'dvr') {
    uiDuration = streamInfo.duration;
    if (this.progressBarContext.mousedown) {
      uiPosition = this.progressBarContext.movePos;
    } else {
      uiPosition = streamInfo.position;
    }
    uiBufferedPos = uiPosition;

    tDisplayText = 'Live';
  } else {
    uiDuration = streamInfo.duration;

    if (this.progressBarContext.mousedown) {
      uiPosition = this.progressBarContext.movePos;
    } else {
      uiPosition = streamInfo.position;
    }

    if (this.progressBarContext.mousedown) {
      uiBufferedPos = uiPosition;
    } else {
      var currBuffered = this.player_.getValidBufferDuration();
      uiBufferedPos = uiPosition + (currBuffered === NaN ? 0 : currBuffered);
    }

    // update progress bar time display
    var c = timeToString(uiPosition);
    var d = timeToString(uiDuration);
    tDisplayText = c + '/' + d;
  }

  this.vopLoadProgress.style.transform = 'scaleX(' + uiBufferedPos / uiDuration + ')';
  this.vopPlayProgress.style.transform = 'scaleX(' + uiPosition / uiDuration + ')';

  // update time progress scrubber button
  this.vopScrubberContainer.style.transform = 'translateX(' + ((uiPosition / uiDuration) * this.vopProgressBar.clientWidth).toString() + 'px)';

  var tDisplay = document.querySelector('.vop-time-text');
  tDisplay.innerText = tDisplayText;

  if (streamInfo.type === 'live') {
    this.vopProgressBar.style.display = 'none';
  } else {
    this.vopProgressBar.style.display = 'block';
  }
};

adsUI.onOpenFinished = function() {
  this.flagPlayerInited = true;

  // update quality context
  this.settingMenuContext.qualityList = [];

  var qualityLevels = this.player_.getQualityLevels();
  if (qualityLevels.length > 1) {
    var tmpQualitys = [];
    for (var i = 0; i < qualityLevels.length; ++i) {
      var quality = qualityLevels[i];
      tmpQualitys.push({ id: quality.id, bitrate: quality.bandwidth });
    }
    tmpQualitys.sort(function(a, b) {
      return b.bitrate - a.bitrate;
    });
    tmpQualitys.forEach(function(quality) {
      var bitrate = Math.round(quality.bitrate / 1000) + ' kbps';
      this.settingMenuContext.qualityList.push({ id: quality.id, bitrate: bitrate });
    }.bind(this));

    if (qualityLevels.length > 1) {
      this.settingMenuContext.qualityList.push({ id: '', bitrate: 'Auto' });
    }
    this.settingMenuContext.currBitrate = 'Auto';
    this.settingMenuContext.isQualityAuto = true;
  }

  // update audio track context
  this.settingMenuContext.audioTrackList = [];
  var audioTracks = this.player_.getAudioTracks();
  if (audioTracks.length > 0) {
    audioTracks.forEach(function(track) {
      var lang = track.id + '_' + track.lang;
      this.settingMenuContext.audioTrackList.push({ id: track.id, lang: lang });
    }.bind(this));
    this.settingMenuContext.currAudioTrackLang = this.settingMenuContext.audioTrackList[0].lang;
    this.settingMenuContext.isAudioTrackAuto = false;
  }

  // update progress bar
  var streamInfo = this.getStreamInfo();
  if (streamInfo.type === 'live') {
    this.vopControlBar.style.display = 'none';
  } else {
    this.vopControlBar.style.display = 'block';
  }

  // update volume bar
  var muted = this.player_.isMuted();
  var volume = this.player_.getVolume();
  this.updateContentVolumeBarUI(muted, volume);

  // update play/pause button
  var paused = this.player_.isPaused();
  this.updatePlayBtnUI(paused, false);
};

adsUI.onAdStarted = function(e) {
  printLog('+onAdStarted', LOG_DEBUG);
  this.flagAdStarted = true;
  if (e.adType === 'nonlinear') {
    this.flagIsLinearAd = false;
  } else {
    this.flagIsLinearAd = true;
  }

  // update control bar ui
  if (this.flagIsLinearAd) {
    this.vopProgressBar.style.pointerEvents = 'none';
    this.vopScrubberContainer.style.display = 'none';
    this.vopSubtitlesBtn.style.display = 'none';
    this.vopSettingsBtn.style.display = 'none';
  }

  // record content player waiting state
  if (this.vopSpinner.style.display === 'block') {
    this.adContext.contentWaiting = true;
    this.vopSpinner.style.display = 'none';
  }

  var paused = false;
  var ended = false;
  this.updatePlayBtnUI(paused, ended);

  // update volume bar
  var muted = this.player_.isMuted();
  var volume = this.player_.getVolume();
  this.updateContentVolumeBarUI(muted, volume);
};

adsUI.onAdComplete = function() {
  printLog('+onAdComplete', LOG_DEBUG);
  this.flagAdStarted = false;

  // update control bar
  this.vopProgressBar.style.pointerEvents = 'auto';
  this.vopScrubberContainer.style.display = 'block';
  if (this.subtitlesMenuContext.subtitleTracks.length > 0) {
    this.vopSubtitlesBtn.style.display = 'inline-block';
  }
  // button display are 'inline-block' by default, see https://www.w3.org/TR/CSS21/sample.html
  this.vopSettingsBtn.style.display = 'inline-block';

  // recover content player waiting state
  if (this.adContext.contentWaiting) {
    this.vopSpinner.style.display = 'none';
  }

  // update volume bar
  var muted = this.player_.isMuted();
  var volume = this.player_.getVolume();
  this.updateContentVolumeBarUI(muted, volume);

  // after post-roll complteted, need to update player UI.
  var paused = adsUI.player_.isPaused();
  var ended = adsUI.player_.isEnded();
  this.updatePlayBtnUI(paused, ended);
  this.updateProgressBarUI();
};

adsUI.onAdCompanion = function(e) {
  if (!e) { return; }

  for (var i = 0; i < e.length; i++) {
    var companion = e[i];
    printLog('Companion Ad, width: ' + companion.width + ', height: ' + companion.height);
  }
};

adsUI.updatePlayBtnUI = function(paused, ended) {
  if (this.flagAdStarted && this.flagIsLinearAd) {
    if (paused) {
      this.vopPlayBtn.innerHTML = this.playIcon;
      this.vopPlayBtn.title = 'play';
    } else {
      this.vopPlayBtn.innerHTML = this.pauseIcon;
      this.vopPlayBtn.title = 'pause';
    }
  } else {
    if (ended) {
      this.vopPlayBtn.innerHTML = this.replayIcon;
      this.vopPlayBtn.title = 'replay';
    } else {
      if (paused) {
        this.vopPlayBtn.innerHTML = this.playIcon;
        this.vopPlayBtn.title = 'play';
      } else {
        this.vopPlayBtn.innerHTML = this.pauseIcon;
        this.vopPlayBtn.title = 'pause';
      }
    }
  }
};

adsUI.onPlayButtonClick = function() {
  if (!this.flagPlayerInited) {
    return;
  }

  var currPaused = this.player_.isPaused();
  var currEnded = this.player_.isEnded();

  // do replay
  if (currEnded && !(this.flagIsLinearAd && this.flagAdStarted)) {
    this.replay();
  } else {
    var newPaused;
    // execute ui cmd
    if (currPaused) {
      this.player_.play();
      newPaused = false;
    } else {
      this.player_.pause();
      newPaused = true;
    }

    // update ui
    this.updatePlayBtnUI(newPaused, currEnded);

    // don't show buffering icon when paused
    if (newPaused) {
      this.vopSpinner.style.display = 'none';
    }
  }
};

function onAdTypeChange(type) {
  adsUI.adContext.currAdType = type;
  printLog('+onAdTypeChange, type: ' + type);
  switch (adsUI.adContext.currAdType) {
    case '-1':
      {}
      break;
    case '0':
      {
        ads_config.advertising.tag = Single_Inline_Linear;
      }
      break;
    case '1':
      {
        ads_config.advertising.tag = Single_Non_linear_Inline;
      }
      break;
    case '2':
      {
        ads_config.advertising.tag = VMAP_Pre_Mid_Post;
      }
      break;
    case '3':
      {
        ads_config.advertising.tag = Single_VPAID_20_Linear;
      }
      break;
    default:
      break;
  }
}

function onClickLoad() {
  if (adsUI.adContext.currAdType === "-1") {
    alert("Please select ad type!");
    return;
  }
  if (adsUI.player_) {
    adsUI.player_.close();
  } else {
    adsUI.createPlayer();
  }
  adsUI.resetUI();
  adsUI.player_.init(ads_config);
  adsUI.open(ads_stream);
}

window.onload = function() {
  adsUI.initVariable();
  adsUI.initUI();
  adsUI.initUIEventListeners();
  adsUI.resetUI();
};

window.onunload = function() {};