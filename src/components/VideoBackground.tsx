import React, { useEffect, useRef } from 'react';
import styles from '../styles/Hero.module.css';

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate movement as percentage from center (-1 to 1)
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      // Reverse direction and apply subtle movement (max 3% in each direction)
      targetX.current = -xPercent * 3;
      targetY.current = -yPercent * 3;
    };

    const animate = () => {
      // Smooth interpolation
      const ease = 0.08;
      currentX.current += (targetX.current - currentX.current) * ease;
      currentY.current += (targetY.current - currentY.current) * ease;

      video.style.transform = `translate(${currentX.current}%, ${currentY.current}%) scale(1.1)`;
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.videoContainer}>
      {/* 
        PLACEHOLDER VIDEO SOURCE
        Replace the src below with your local video file or hosted URL.
        Example: src="/assets/my-background-video.mp4"
      */}
      <video
        ref={videoRef}
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
