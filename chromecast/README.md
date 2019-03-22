# Chromecast
To enable Chromecast the init(config) must be called successfully. See the following sample code to configure the receiver media player.

# Example:
    var playerConfig = { 
        autoPlay: true, 
        cast: { 
            receiverAppId : 'B5BCD208' //VisualOn default customer receiver 
        } 
    }; 
    player.init(playerConfig)

VisualOn HTML5+ player provides custom receiver SDK. If you want to set up your own server to host the receiver by using VisualOn receiver SDK, refer to https://developers.google.com/cast/docs/registration to register your cast application and get the application ID. The analytics data of Chromecast will be sent to your own server, otherwise, to VisualOn default analytics server by using VisualOn default customer receiver which is hosted by VisualOn and the application ID is B5BCD208. The application ID is used with API calls from the sender application.


# [Chromecast Demo](https://www.visualon.com/index.php/html5demo/?demo=chromecast)
