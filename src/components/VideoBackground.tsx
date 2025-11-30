import React from 'react';
import styles from '../styles/Hero.module.css';

const VideoBackground: React.FC = () => {
  return (
    <div className={styles.videoContainer}>
      {/* 
        PLACEHOLDER VIDEO SOURCE
        Replace the src below with your local video file or hosted URL.
        Example: src="/assets/my-background-video.mp4"
      */}
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        // Using a high-quality placeholder from Pexels (or similar)
        // This is a direct link to a sample video. 
        src="src/assets/stabalized background.mov
        "
      />
      {/* Overlay is now handled in Hero.tsx for the reveal animation */}
    </div>
  );
};

export default VideoBackground;
