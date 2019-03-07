var basicUI = Object.create(CommonUI);

basicUI.onload = function() {
  this.initVariable();
  this.initUI();
  this.initUIEventListeners();
  this.initPlayer(common_config);
  checkMSE()
};

basicUI.onProtocolChange = function() {
  var proc = document.getElementById('protocol').value;
  if (proc === 'HLS')
    this.open(HLS_Clear_stream);
  else if (supportDASH()) {
    this.open(DASH_Clear_stream);
  } else {
    alert(proc + ' is not supported');
  }
};

window.onload = function() {
  basicUI.onload();
  basicUI.open(HLS_Clear_stream);
};

window.onunload = function() {};