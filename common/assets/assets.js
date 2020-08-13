// Title: Basic assets
var HLS_LINK = 'https://d1w9xdakxie2rx.cloudfront.net/html5/hls/playlist.m3u8';
var DASH_LINK = 'https://d1w9xdakxie2rx.cloudfront.net/html5/dash/voweb_dash.mpd';
var common_config = {
  width: '100%',
  height: '100%',
  playback: {
    autoPlay: true
  },
  analytics: [{
    type: 'server',
    options: {
      cuid: 'VISUALON_CUSTOM_DEMO'

    }
  }],
  logs: {
    logToConsole: false
  }
};

var HLS_Clear_stream = {
  links: [{
    uri: HLS_LINK,
    type: 'hls'
  }]
};
var DASH_Clear_stream = {
  links: [{
    uri: DASH_LINK,
    type: 'dash'
  }]
};

var DRM_stream_wv = {
  links: [{
    uri: 'https://storage.googleapis.com/wvmedia/cenc/h264/tears/tears_sd.mpd',
    type: 'dash',
    drm: {
      widevine: {
        laUrl: 'https://proxy.uat.widevine.com/proxy'
      }
    }
  }]
};
var DRM_stream_pr = {
  links: [{
    uri: 'https://profficialsite.origin.mediaservices.windows.net/c51358ea-9a5e-4322-8951-897d640fdfd7/tearsofsteel_4k.ism/manifest(format=mpd-time-csf)',
    type: 'dash',
  }]
};

// Title: Ad assets
// Single Inline Linear
var Single_Inline_Linear = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';
// Single Non-linear Inline
var Single_Non_linear_Inline = 'https://pubads.g.doubleclick.net/gampad/ads?sz=480x70&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dnonlinear&correlator=';
// VMAP Pre Mid Post
var VMAP_Pre_Mid_Post = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&cmsid=496&vid=short_onecue&correlator=';

// VPAID
var VPAID_LINK = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinearvpaid2js&correlator=';

var Single_VPAID_20_Linear = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinearvpaid2js&correlator=';

var ads_config = JSON.parse(JSON.stringify(common_config));
ads_config.advertising = {
  tag: Single_Inline_Linear,
  vpaidmode: 'insecure'
};

var ads_stream = {
  links: [{
    uri: HLS_LINK,
    type: 'hls'
  }]
};

// Titlie: airplay-and-pip assets
var Airplay_Pip_stream = {
  links: [{
    uri: HLS_LINK,
    type: 'hls'
  }]
};

// Title: chromecast assets
var Chromecast_config = JSON.parse(JSON.stringify(common_config));
Chromecast_config.cast = {
  receiverAppId: 'FF4B0BBE' // VisualOn WebSite Demo customer receiver
};

var Chromecast_stream = {
  links: [{
    uri: DASH_LINK,
    type: 'dash'
  }]
};

// Title: External subtitle assets
var External_Subtitle_stream = {
  links: [{
    uri: DASH_LINK,
    type: 'dash'
  }]
};

var External_Subtitle_info = {
  uri: 'https://d1w9xdakxie2rx.cloudfront.net/html5/voweb.webvtt',
  lang: 'english',
  default: true
};

// Title: Lowlatency
var Low_latency_stream = {
  links: [{
    uri: 'https://livesim.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd'
  }],
  advanced: {
    lowLatencyMode: true
  }
};

// Title: Webvtt-Thumbnail assets
var Webvtt_Thumbnail_stream = {
  links: [{
    uri: HLS_LINK,
    type: 'hls'
  }],
  tracks: [{
    uri: 'https://d1w9xdakxie2rx.cloudfront.net/html5/thumbnails/thumbnails.vtt',
    type: 'thumbnails'
  }]
};

var fcc_stream = {
  links: [{
    uri: 'https://livesim.dashif.org/dash/vod/testpic_2s/cea608.mpd',
    type: 'dash'
  }]
};

/////////////////////////////////////////////////////
// lowlatench comparsion
var Lowlatency_Comparsion_Lowlatency_Stream = {
  links: [{
    uri: 'https://livesim.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
    type: 'dash'
  }],
  advanced: {
    lowLatencyMode: true
  }
};
var Lowlatency_Comparsion_Normal_Stream = {
  links: [{
    uri: 'https://livesim.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd',
    type: 'dash'
  }],
  advanced: {
    lowLatencyMode: false
  }
};
