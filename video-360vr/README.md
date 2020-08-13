# 360°/VR Video Plugin
360º/VR video that can be played in VisualOn HTML5+ Player by this plugin.

# Enable the plugin
1. add plugin js file in html file:
   `<script src="../../libs/voplayer-vr.min.js?n=1"></script>`
2. add plugin before init the player:```
    player_.addPlugin(voPlayer.voVRPlugin);
    player_.init(common_config);```
3. set the projection via the vr in sourceConfig object:```
    source: {
      links: [{
        uri: "https://media.axprod.net/TestVectors/v6-MultiDRM/Manifest_1080p.mpd",
        type: 'dash',
        vr: {
          projection: 360 
        }
      }]
    }```

# The description of "projection"
* **'180'**

The video is half sphere and the user should not be able to look behind themselves.

* **'360'**

The video is a sphere.

* **'360_CUBE'**

The video is a cube.

* **'360_LR'**

Used for side-by-side 360 videos.

* **'360_TB'**

Used for top-to-bottom 360 videos.

* **'EAC'**

Used for Equi-Angular Cubemap videos.

* **'EAC_LR'**

Used for side-by-side Equi-Angular Cubemap videos.

* **'NONE'**

This video is not a 360 video.

# Note:
1. The plugin does not work with Internet Explorer.
2. The 360°/VR Plugin does not support DRM.
3. This plugin is compatible with VisualOn HTML5+ Player version 3.33.0 or later.
4. Due to restrictions enforced by Apple, the VR/360 content needs to be hosted on the exact same domain as your website on safari of iOS. So if your website is served via https://example.com, your content has to be served via the exact same domain, e.g. https://example.com/path/to/your/video/content/.
5. If you want to use the "device orientation" function on the phone, please make sure your website starts with "https".
6. On iOS 13 the app will ask the user for permission to use the device motion and orientation (gyroscope) functionality. See Apple's Requesting Permission document for more information.
7. In Safari 12.x the gyroscope integration for mobile devices is turned off by default. The Motion & Orientation Access settings must be changed in order for the gyro feature to function.