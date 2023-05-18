"use client"
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const VideoPlayer = ({ params }) => {
  const videoRef = useRef(null);
  const plyrRef = useRef(null);

  const src = params.main;
  const altSource = params.alt;

  useEffect(() => {
    const defaultOptions = {};

    let hls = null;
    let plyr = null;

    try {
      if (Hls.isSupported()) {
        const video = videoRef.current;
        hls = new Hls();
        hls.loadSource(src);

        hls.on(Hls.Events.ERROR, () => {
          hls.loadSource(altSource);
          hls.off(Hls.Events.ERROR);
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          hls.levels.reverse();
          const qualityLevels = hls.levels.map((level, index) => ({
            label: level.height,
            src: level.url,
            selected: index === hls.currentLevel,
          }));

          defaultOptions.controls = [
            'play-large',
            'restart',
            'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen',
          ];

          defaultOptions.quality = {
            default: qualityLevels[qualityLevels.length - 1].label,
            options: qualityLevels.map((level) => level.label),
            forced: true,
            onChange: (quality) => {
              updateQuality(quality);
            },
          };

          plyr = new Plyr(video, defaultOptions);
        });

        hls.attachMedia(video);
      } else {
        plyr = new Plyr(video, defaultOptions);
        console.error('HLS is not supported by your browser');
      }
    } catch (error) {
      console.error('An error occurred during hls.js or Plyr initialization:', error);
    }

    function updateQuality(newQuality) {
      if (newQuality === 0) {
        hls.currentLevel = -1;
      } else {
        hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            hls.currentLevel = levelIndex;
          }
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (plyr) {
        plyr.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} controls />;
};

export default VideoPlayer;
