# Thumbnail
You can set the WebVTT thumbnail via the tracks in sourceConfig object

# Example:
      tracks: [{
          uri: 'https://path/to/thumbnail/vtt/url.vtt',
          type: 'thumbnails'
      }]
You can use findNearestThumbnail(pos) to get a thumbniailInfo object of a specific media position.


# [Thumbnail Demo](https://www.visualon.com/index.php/html5demo/?demo=webvtt-thumbnails)
