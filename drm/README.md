# DRM
Set media source and DRM information in sourceConfig(link to sourceConfig of API Doc) object.You can set multiple streams with different DRM in one object which point to the same media source, VisualOn HTML5+ player will apply the appropriate stream according to the supported DRM type of your browser. That is, it would play link with Fairplay on safari, play link with PlayReady on IE/EDGE and play link with Widevine on Chrome/Firefox. If more than one link is supported on current browser, the first one will be chosen.VisualOn HTML5+ player also supports multiple DRM in one stream, it will choose the supported DRM of the current browser. Please check the example of an object as following:

# Example:
    links: [
      {
          uri: "myFairplayStream.m3u8",
          drm: {
              fairplay: {
                  laUrl: 'https://myfairplay.licenseserver.com/',
                  certificateUrl: 'https://myfairplay.licenseserver.com/cert',
                  headers: { 'header1': 'token1', 'header2': 'token2'},
                  withCredentials: true,
                  licenseResponseType: 'text',
                  isResponseBase64Encode: true,
                  useUint8InitData: false,
                  buildMessage: function (event, session) {
                      return JSON.stringify({spc: event.messageBase64Encoded });
                  },
                  processLicense: function (responseText) {
                      return JSON.parse(responseText).ckc;
                  },
                  extractContentId: function (contentId) {
                      var hostname = "invalid.";
                      var pos = contentId.indexOf('skd://');
                      if (pos >= 0) {
                          hostname = contentId.substring(pos + 6);
                      }
                      return hostname;
                  }
              }
          },
          options: {
              manifestWithCredentials: true,
              segmentWithCredentials: false
          }
      }, {
          uri: "myWidevineStream.mpd",
          drm: {
              widevine: {
                  laUrl: "https://mywidevineurl.com/drm",
                  headers: { 'header1': 'token1', 'header2': 'token2'},
                  withCredentials: false
              }
          }
      }, {
          uri: "myPlayreadyStream.mpd",
          drm: {
              playready: {
                  laUrl: "https://myplayreadyurl.com/drm"
               }
          }
      }, {
          uri: "myClearkeyStream.mpd",
          drm: {
              clearkey: {
                  keys: { "1234clear5678key" : "fefde00d-efde-adbf-eff1-baadf01dd11d", "5678clear1234key" : "baadf01dd11d-efde-adbf-eff1-fefde00d" }
              }
          }
      }, {
          uri: "https://path/to/mp4",
      }]
      
      

# [DRM Demo](https://www.visualon.com/index.php/html5demo/?demo=drm)
