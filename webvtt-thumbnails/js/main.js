var vttThumbnailUI = Object.create(CommonUI);

vttThumbnailUI.getTooltipOffsetX = function(e, tooltipWidth) {
  // bounding client rect can return the progress bar's rect relative to current page.
  var rect = this.vopProgressBar.getBoundingClientRect();
  var leftMin = 12;
  var rightMax = 12 + rect.width;

  var offsetToProgressBar = (e.clientX - rect.left);
  var offsetToVideo = offsetToProgressBar + 12;

  var tooltipLeft_RelativeToVideo = offsetToVideo - tooltipWidth / 2;
  var tooltipRight_RelativeToVideo = offsetToVideo + tooltipWidth / 2;

  if (tooltipLeft_RelativeToVideo < leftMin) {
    tooltipLeft_RelativeToVideo = leftMin;
  } else if (tooltipRight_RelativeToVideo > rightMax) {
    tooltipLeft_RelativeToVideo = rightMax - tooltipWidth;
  }

  return tooltipLeft_RelativeToVideo;
};

// The main difference between chromecast demo and basic demo is function 'updateTooltipUI'.
// You can research this function to know how to render vtt thumbnails to ui.
vttThumbnailUI.updateTooltipUI = function(e) {
  var streamInfo = this.getStreamInfo();
  if (isNaN(streamInfo.position) || isNaN(streamInfo.duration)) {
    return;
  }

  var thumbnail = this.player_.findNearestThumbnail(this.progressBarContext.movePos);
  // update tooltip thumbnail
  if (thumbnail) {
    $('.vop-tooltip').addClass('vop-preview');
    if (thumbnail.w && thumbnail.h) {
      this.vopTooltipBg.style.width = thumbnail.w.toString() + 'px';
      this.vopTooltipBg.style.height = thumbnail.h.toString() + 'px';
      this.vopTooltipBg.style.background = 'url(' + thumbnail.url + ') -' + thumbnail.x + 'px -' + thumbnail.y + 'px';
    } else {
      this.vopTooltipBg.style.width = '158px';
      this.vopTooltipBg.style.height = '90px';
      this.vopTooltipBg.style.background = 'url(' + thumbnail.url + ')';
      this.vopTooltipBg.style.backgroundSize = '100% 100%';
    }
  } else {
    $('.vop-tooltip').removeClass('vop-preview');
  }

  // update tooltip offset
  if (streamInfo.type === 'dvr') {
    var strTime = timeToString((streamInfo.duration - this.progressBarContext.movePos));
    this.vopTooltipText.innerText = '-' + strTime;
  } else {
    this.vopTooltipText.innerText = timeToString(this.progressBarContext.movePos);
  }

  // calculate tooltipWidth first
  this.vopTooltip.style.left = '10000px';
  this.vopTooltip.style.display = 'block';
  var tooltipWidth = this.vopTooltip.clientWidth;

  var offsetX = this.getTooltipOffsetX(e, tooltipWidth);
  this.vopTooltip.style.left = offsetX.toString() + 'px';
};

vttThumbnailUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(common_config);
};

window.onload = function() {
  vttThumbnailUI.onload();
  vttThumbnailUI.open(Webvtt_Thumbnail_stream);
};

window.onunload = function() {};