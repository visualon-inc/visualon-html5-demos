# Low Latency
VisualOn html5 player provides a lowLatency mode to fit to the situation with high real-time demand. User can enable lowLatency mode by setting the lowLatencyMode as true in “ advanced” object of configuration for initializing the player.

# Example:
    var playerConfig = {
        playback: {
            autoPlay: true
        },
        advanced: {
            lowLatencyMode: true
        },
        logs: {
            logToConsole: false
        }
    };
    player.init(playerConfig);

Now lowLatency mode can only be used on chrome and safari.

# Click to see [Demo] (https://www.visualon.com/index.php/html5-player-low-latency-demo2/)

