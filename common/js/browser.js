var BrowserDetect = {
  init: function() {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent) ||
      this.searchVersion(navigator.appVersion) ||
      "an unknown version";
    this.OS = this.searchString(this.dataOS);
  },
  searchString: function(data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      } else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function(dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
      string: navigator.userAgent.toLowerCase(),
      subString: "smart-tv",
      identity: "SamsungBrowser"
    }, {
      string: navigator.userAgent.toLowerCase(),
      subString: "web0s",
      identity: "WebOS"
    },

    {
      string: navigator.userAgent,
      subString: "OPR",
      identity: "Opera"
    }, {
      prop: window.opera,
      identity: "Opera"
    }, {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    }, {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    }, {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    }, {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    }, {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    }, {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    }, {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    }, { // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    }, {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "MSIE",
      versionSearch: "MSIE"
    }, {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "MSIE",
      versionSearch: "rv"
    }, { // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS: [{
    string: navigator.userAgent.toLowerCase(),
    subString: "smart-tv",
    identity: ""
  }, {
    string: navigator.userAgent.toLowerCase(),
    subString: "web0s",
    identity: ""
  }, {
    string: navigator.platform,
    subString: "Win",
    identity: "Win"
  }, {
    string: navigator.platform,
    subString: "Mac",
    identity: "Mac"
  }, {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iOS"
  }, {
    string: navigator.platform,
    subString: "Linux",
    identity: "Linux"
  }]

};
var SupportMatrix = {
  HLS: ['WinChrome', 'WinEdge', 'WinMSIE', 'WinFirefox', 'WinOpera', 'MacSafari', 'MacChrome', 'MacFirefox', 'MacOpera', 'iOSSafari', 'iOSChrome', 'LinuxChrome'],
  DASH: ['WinChrome', 'WinEdge', 'WinMSIE', 'WinFirefox', 'WinOpera', 'MacSafari', 'MacChrome', 'MacFirefox', 'MacOpera', 'iOSChrome', 'LinuxChrome'],
  DRM: ['WinChrome', 'WinFirefox', 'WinOpera', 'MacChrome', 'MacFirefox', 'MacOpera', 'LinuxChrome'],
  Widevine: ['WebOS', 'SamsungBrowser', 'WinChrome', 'WinFirefox', 'WinOpera', 'MacChrome', 'MacFirefox', 'MacOpera', 'iOSChrome', 'LinuxChrome'],
  FairPlay: ['MacSafari', 'iOSSafari'],
  Playready: ['WebOS', 'SamsungBrowser', 'WinMSIE', 'WinEdge'],
  Thumbnail: ['WinChrome', 'WinEdge', 'WinMSIE', 'WinFirefox', 'WinOpera', 'MacSafari', 'MacChrome', 'MacFirefox', 'MacOpera', 'iOSChrome', 'LinuxChrome'],
  Chromecast: ['WinChrome', 'MacChrome', 'iOSChrome', 'LinuxChrome'],
  AirPlay: ['MacSafari', 'iOSSafari'],
  ExternalSubtitle: ['WinChrome', 'WinEdge', 'WinMSIE', 'WinFirefox', 'WinOpera', 'MacSafari', 'MacChrome', 'MacFirefox', 'MacOpera', 'iOSChrome', 'LinuxChrome'],
  LowLatency: ['WinChrome', 'MacSafari', 'MacChrome'],
  Ads: ['WinChrome', 'WinEdge', 'WinMSIE', 'WinFirefox', 'WinOpera', 'MacSafari', 'MacChrome', 'MacFirefox', 'MacOpera', 'iOSChrome', 'LinuxChrome'],
  FCC: [],
  CMAF: []
};
BrowserDetect.init();
//alert(BrowserDetect.OS+BrowserDetect.browser);