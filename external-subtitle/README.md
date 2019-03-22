# External Subtitle
User can set external subtitle via setExternalSubtitle(subtitle) API. The external subtitle can be set before the playback or during the playback. The parameter is externalSubtitleInfo object, please see as following:

# Example:
    var externalSubtitle = {
       uri: 'https://path/to/external/vtt/url.vtt',
       lang: 'english',           
       default: true
    };
    player.setExternalSubtitle(externalSubtitle);
    


# [External subtitles Demo](https://www.visualon.com/index.php/html5demo/?demo=external-subtitle)
