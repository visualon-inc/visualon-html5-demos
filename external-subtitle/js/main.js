var externalSubtitleUI = Object.create(CommonUI);

externalSubtitleUI.replay = function() {
  this.open(this.stream_);
  this.loadSubtitle(this.subtitleInfo_);
};

externalSubtitleUI.loadSubtitle = function(subtitleInfo) {
  if (subtitleInfo && subtitleInfo.uri !== '') {
    this.subtitleInfo_ = subtitleInfo;
    this.player_.setExternalSubtitle(subtitleInfo);
  }
}

externalSubtitleUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(common_config);
};

window.onload = function() {
  externalSubtitleUI.onload();

  externalSubtitleUI.open(External_Subtitle_stream);
  externalSubtitleUI.loadSubtitle(External_Subtitle_info);
};

window.onunload = function() {};