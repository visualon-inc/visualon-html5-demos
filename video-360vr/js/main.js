"use strict";
// UI Reference
const Constants = {
    DASH: 'dash',
    HLS: 'hls',
    PROGRESSIVE: 'progressive',
    PRJ_360: '360',
    LR_360: '360_LR',
    TB_360: '360_TB',
    CUBE_360: '360_CUBE',
    EAC: 'EAC',
    EAC_LR: 'EAC_LR',
    PRJ_NONE: 'NONE',
    PRJ_180: '180'
  };
  
  const VO_STREAM_TYPES = [
    { name: Constants.HLS },
    { name: Constants.DASH },
    { name: Constants.PROGRESSIVE }
  ];
  
  const VO_VR_PROJECTION_TYPES = [
      { name: Constants.PRJ_360 },
      { name: Constants.LR_360 },
      { name: Constants.TB_360 },
      { name: Constants.CUBE_360 },
      { name: Constants.EAC },
      { name: Constants.EAC_LR },
      { name: Constants.PRJ_180 },
      { name: Constants.PRJ_NONE }
    ];

var playerContainer_;
var sourceCfg_;
var player_ = null;
var playerUI_ = null;

var idSelectStreamType_;
var idSelectVRPrjType_;
var idInputURL_;
var idBtnLoad_;
var idBtnStop_;

sourceCfg_ = {
  links: [{
    uri: '',
    type: ''
  }]
};

window.onload = function() {
    playerContainer_ = document.getElementById('player-container');
    // build player
    player_ = new voPlayer.Player(playerContainer_);
    player_.addPlugin(voPlayer.voVideo360vrPlugin);
    player_.init(common_config);

    initUI();

    if (!UITools.isIOS()) {
      onBtnLoad();
    }
}

function initUI() {
    // attach ui engine
    playerUI_ = new voPlayer.UIEngine(player_);
    playerUI_.buildUI();

    idSelectStreamType_ = document.getElementById('idSelectStreamType');
    idSelectVRPrjType_ = document.getElementById('idSelectVRPrjType');
    idInputURL_ = document.getElementById('idInputURL');

    initStreamType();
    initVRPrjType();

    idBtnLoad_ = document.getElementById('idBtnLoad');
    idBtnStop_ = document.getElementById('idBtnStop');
    idBtnLoad_.addEventListener('click', onBtnLoad);
    idBtnStop_.addEventListener('click', onBtnStop);
}

function initStreamType() {
    VO_STREAM_TYPES.forEach(function(item) {
      var option = document.createElement('option');
      option.item = item;
      option.textContent = item.name;
  
      idSelectStreamType_.appendChild(option);
    });
  }
  
  function initVRPrjType() {
      VO_VR_PROJECTION_TYPES.forEach(function(item) {
          var option = document.createElement('option');
          option.item = item;
          option.textContent = item.name;
      
          idSelectVRPrjType_.appendChild(option);
        });
  }

  function onBtnLoad(e) {
    player_.close();
    sourceCfg_.links[0].uri = idInputURL_.value;
    sourceCfg_.links[0].type = idSelectStreamType_.options[idSelectStreamType_.selectedIndex].item.name;
    sourceCfg_.links[0].vr = {};
    sourceCfg_.links[0].vr.projection = idSelectVRPrjType_.options[idSelectVRPrjType_.selectedIndex].item.name;
    player_.open(sourceCfg_);

    if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
        } else {
          // Permission denied
        }
      }).catch(console.error);
    }
  }
  
  function onBtnStop() {
    player_.close();
  }

