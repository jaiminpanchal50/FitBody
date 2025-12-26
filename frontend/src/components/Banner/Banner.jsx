import bgvideo from '../../assets/bgVideo.mp4';
import './style.css';

const Banner = ({ title, description, bgVideo, btnText, link }) => {
  return (
    <section className="banner">
      <div className='page-center'>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="bg-video"
        >
          <source src={bgVideo || bgvideo} type="video/mp4" />
        </video>

        <div className="banner-content">
          <h1>{title}</h1>
          <p className='large'>{description}</p>
          <div className="banner-btn">
            <a href={link} className="btn btn-primary">{btnText}</a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
