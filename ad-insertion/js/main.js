var playerContainer_ = null;
var adErrorText_ = null;
var player_ = null;
var playerUI_ = null;
var adContext = {
  currAdType: '-1'
};

function onAdTypeChange(type) {
  adContext.currAdType = type;
  printLog('+onAdTypeChange, type: ' + type);
  switch (adContext.currAdType) {
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
  if (adContext.currAdType === "-1") {
    alert("Please select ad type!");
    return;
  }
  adErrorText_.innerHTML = '';
  player_.close();
  player_.uninit();
  player_.init(ads_config);
  player_.open(ads_stream);
}

window.onload = function () {
  playerContainer_ = document.getElementById('player-container');
  // build player
  player_ = new voPlayer.Player(playerContainer_);
  player_.addPlugin(voPlayer.voAnalyticsPlugin);
  player_.addPlugin(voPlayer.voAdsPlayerPlugin);
  player_.init(ads_config);

  // attach ui engine
  playerUI_ = new voPlayer.UIEngine(player_);
  playerUI_.buildUI();

  adErrorText_ = document.getElementById('adsErrorText');
  player_.addEventListener(voPlayer.events.VO_OSMP_AD_ERROR, onAdError);
};

onAdError = function (e) {
  adErrorText_.innerHTML = e.client + ' ERROR: ' + e.id + ' - ' + e.msg;
};
