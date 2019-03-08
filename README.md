# VisualOn HTML5+ Player Project Setup and Demos

## Get the evaluation SDK
The VisualOn HTML5 evaluation SDK is provided upon request. Please [click here](https://www.visualon.com/index.php/contact-2) to let us know and provide  better assistance to your requests.

## Prerequisite
Please refer to Tools/setuphttpserver/Win32/README.txt or Tools/setuphttpserver/MacOS/README.md to check how to setup a http server and run the player Demo.


## Quick start for developers
Create a div element in your html first. Please make sure the controls attribute
is present.
```html
<div id="container"></div>
```
Add voplayer.min.js to the end of the body.
```html
<body>
  ...
  <script src="yourPathOfLibs/voplayer.min.js"></script>
</body>
```
Now comes to good stuffs. We need to create a MediaPlayer & initialize it.
```js
   var divVideoPlayer = document.getElementById("container");
   var player = new voPlayer.Player(divVideoPlayer);
   player.init(config);
   player.open(source);
   player.play();
```
When it is all done, it should look like the following code.
```html
<!DOCTYPE html>
<html>
  <body>
    <div>
      <div id="container"></div>
    </div>
    <script src="libs/voplayer.min.js"></script>
    <script>
      var container = document.getElementById("container");
      var player = new voPlayer.Player(container);
      var config = {
          playback: {
            autoPlay: true
          }
      };
      player.init(config);
      var source = {
        links: [{
            uri: "http://dash.edgesuite.net/akamai/bbb_30fps/bbb_30fps.mpd"
        }]
      };
      player.open(source);
    </script>
  </body>
</html>
```
## Guide for configuring player and source
User can initialize the player by a configuration and open the media source with sourceConfig. 

For the sample code, user can modify "voDefaultConfig" and "voDefaultStream" in "SamplePlayer/sampleplayer/app/assets.js"
to set own configuration and default stream. Also can add streams to "voAvailableStreams" in
"SamplePlayer/sampleplayer/app/assets.js".

If there is no complicated configuration of the media source, users can input the url and related drm information 
by selecting "Enter Asset" from the drop-down menu of "stream" in the Demo.



## Developer guide and demos


- **Chromecast**: Cast video directly to your screen using Chromecast and the VisualOn HTML5 Player. 
- [Chromecast Developer Guide](/chromecast)
- [Chromecast Demo](https://www.visualon.com/index.php/html5-player-chromecast-demo/)

- **DRM**: VisualOn HTML5 Player makes it easier to target the necessary DRM for a multi-DRM content object. 
- [DRM Developer Guide](/drm) 
- [DRM Demo](https://www.visualon.com/index.php/html5-player-drm-demo/)

-  **External Subtitle**： The VisualOn HTML5 Player supports multiple types of external subtitle including SRT, TTML and WebVTT. 
- [External Subtitles Developer Guide](/external-subtitle)
- [External Subtitles Demo](https://www.visualon.com/index.php/html5-player-external-subtitle-demo/)

- **Low Latency**： VisualOn HTML5 player provides a lowLatency mode to fit to the situation with high real-time demand.   
- [Low Latency Developer Guide](/low-latency)
- [Low Latency Demo](https://www.visualon.com/index.php/html5-player-low-latency-demo2/)

- **AirPlay**: AirPlay allows wireless streaming and related metadata between devices of audio, video, and photos, as well as the sharing of screens. With a simple configuration of your app, you can deliver AirPlay functionality to your users. 
- [AirPlay Reference code](/airplay-and-picture-in-picture)
- [AirPlay Demo](https://www.visualon.com/index.php/html5-player-airplay-demo/)

- **Thumbnail**: Hover over the timeline to see the Thumbnail feature of the VisualOn HTML5 Player in action in the following demo page. 
- [Thumbnail Developer guide](/webvtt-thumbnails)
- [Demo Page](https://www.visualon.com/index.php/html5-player-thumbnail-demo/)


- **Analytics Overlay** :VisualOn Analytics Overlay captures and demonstrates the real-time player KPI with onscreen overlay on VisualOn HTML5 player. 
- [Analytics Overlay Reference Code](/analytics-overlay)
- [Analytics Overlay Demo](https://www.visualon.com/index.php/html5-player-analytics-overlay-demo/)

- **Ad Insersion**: The VisualOn HTML5 Player supports server side and client side ad insertion, as well as ad playback and tracking.
- [Ad Insersion Reference Code](/ad-insertion)
- [Ad Insersion Demo](https://www.visualon.com/index.php/html5-player-ads-demo/)

- **AirPlay and Picture in Picture**: AirPlay allows wireless streaming and related metadata between devices of audio, video, and photos, as well as the sharing of screens. With a simple configuration of your app, you can deliver AirPlay functionality to your users. Picture-in-picture is the feature of the VisualOn HTML5 Player to display one program/channel on the full TV screen at the same time as one or more other programs/channels are displayed in inset windows.
- [AirPlay and Picture in Picture Reference Code ](/airplay-and-picture-in-picture)
- [Picture in Picture Demo](https://www.visualon.com/index.php/html5-player-airplay-and-picture-in-picture-demo/)
- [AirPlay Demo](https://www.visualon.com/index.php/html5-player-airplay-demo/)


- **FCC Closed Captions**: The VisualOn HTML5 Player complies with FCC rules for U.S. broadcast captioning, including synchronization and positioning.
-  [FCC Closed Captions Reference Code](/fcc)
-  [FCC Closed Captions Demo](https://www.visualon.com/index.php/html5-player-fcc-demo/)



## Technical support
- Please click [here](https://github.com/visualon-inc/visualon-html5-demos/issues) for any technical support that you need. You can submit you issues on this page, our engineer will respond you queries shortly.


## Documents
- You can access our online documentation from [here](https://www.visualon.com/index.php/developer/)

## License
[MIT License](/LICENSE)
