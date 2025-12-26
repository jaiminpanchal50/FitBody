import bgVideo from '../../assets/bgVideo.mp4';
import './style.scss';

const Banner = () => {
  return (
    <section className="banner">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="bg-video"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="banner-content">
        <h1>Welcome to FitBody</h1>
        <p>Your ultimate fitness companion</p>
      </div>
    </section>
  );
};

export default Banner;
