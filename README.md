# VisualOn HTML5+ Player Project Setup and Demos

## Get the evaluation SDK
The VisualOn HTML5+ Player evaluation SDK is provided upon request. Please [**CLICK HERE**](https://www.visualon.com/index.php/contact) to contact us to request an SDK or communicate directly with us.

## Prerequisite
Please refer to Tools/setuphttpserver/Win32/README.txt or Tools/setuphttpserver/MacOS/README.md to check how to setup an HTTP
server and run the player demo.


## Quick start for developers
Create a div element in your HTML first. Please make sure the controls attribute is present.
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
Now comes to good stuff, we need to create a MediaPlayer & initialize it.
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
Users can initialize the player with a configuration and open the media source with sourceConfig. 

For the sample code, users can modify "voDefaultConfig" and "voDefaultStream" in "SamplePlayer/sampleplayer/app/assets.js"
to set their own configuration and default stream. Also, users can add streams to "voAvailableStreams" in
"SamplePlayer/sampleplayer/app/assets.js".

If the media source does not have a complex configuration, users can input the URL and related DRM information 
by selecting "Enter Asset" from the drop-down menu of "stream" in the Demo.



## Developer guide and demos


- **Chromecast**: Cast video directly to your screen using Chromecast and the VisualOn HTML5+ Player. 
- [Chromecast Developer Guide](/chromecast)
- [Chromecast Demo](https://www.visualon.com/index.php/html5demo/?demo=chromecast)

- **DRM**: The VisualOn HTML5+ Player makes it easier to target the necessary DRM for a multi-DRM content object. 
- [DRM Developer Guide](/drm) 
- [DRM Demo](https://www.visualon.com/index.php/html5demo/?demo=drm)

-  **External Subtitle**： The VisualOn HTML5+ Player supports multiple types of external subtitles including SRT, TTML and WebVTT. 
- [External Subtitles Developer Guide](/external-subtitle)
- [External Subtitles Demo](https://www.visualon.com/index.php/html5demo/?demo=external-subtitle)

- **Low Latency**： The VisualOn HTML5+ player provides a lowLatency mode for live streaming.   
- [Low Latency Developer Guide](/low-latency)
- [Low Latency Demo](https://www.visualon.com/index.php/html5demo/?demo=low-latency)


- **Thumbnail**: Hover over the timeline to see the Thumbnail feature of the VisualOn HTML5+ Player in action in the following demo page. 
- [Thumbnail Developer guide](/webvtt-thumbnails)
- [Demo Page](https://www.visualon.com/index.php/html5demo/?demo=webvtt-thumbnails)


- **Analytics Overlay** :VisualOn Analytics Overlay captures and demonstrates the real-time player KPIs with an onscreen overlay for the VisualOn HTML5+ player. 
- [Analytics Overlay Reference Code](/analytics-overlay)
- [Analytics Overlay Demo](https://www.visualon.com/index.php/html5demo/?demo=analytics-overlay)

- **Ad Insertion**: The VisualOn HTML5+ Player supports server side and client side ad insertion, as well as ad playback and tracking.
- [Ad Insersion Reference Code](/ad-insertion)
- [Ad Insersion Demo](https://www.visualon.com/index.php/html5demo/?demo=a_d_s)

- **AirPlay and Picture in Picture**: AirPlay allows wireless streaming and related metadata between devices of audio, video, and photos, as well as the sharing of screens. With a simple configuration of your app, you can deliver AirPlay functionality to your users. Picture-in-picture is the feature of the VisualOn HTML5+ Player to display one program/channel on the full TV screen while one or more other programs/channels are displayed in inset window(s).
- [AirPlay and Picture in Picture Reference Code ](/airplay-and-picture-in-picture)
- [Picture in Picture Demo](https://www.visualon.com/index.php/html5demo/?demo=picture-in-picture)
- [AirPlay Demo](https://www.visualon.com/index.php/html5demo/?demo=airplay)


- **FCC Closed Captions**: The VisualOn HTML5+ Player complies with FCC rules for U.S. broadcast captioning, including synchronization and positioning.
-  [FCC Closed Captions Reference Code](/fcc)
-  [FCC Closed Captions Demo](https://www.visualon.com/index.php/html5demo/?demo=fcc)


## Custom Content Test
- Just click [here](https://www.visualon.com/index.php/html5demo/?demo=hls-and-dash) to try your own content with our VisualOn HTML5+ Player.


## Technical support
- Please click [here](https://github.com/visualon-inc/visualon-html5-demos/issues) for any technical support that you require. You can submit you issues on this page, our engineers will respond you queries as quickly as possible.


## Documents
- You can access our online documentation from [here](https://www.visualon.com/index.php/developer/)

## License
[MIT License](/LICENSE)
