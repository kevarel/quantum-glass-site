import { Link } from 'react-router-dom';
import '../../gallery.css';


const Gallery: React.FC = () => {
  return (
    <div>
      <nav className="gallery-nav">
        <Link to="/" className="gallery-nav-button">Home</Link>
        <Link to="/gallery" className="gallery-nav-button">Gallery</Link>
      </nav>
      <div className="gallery-boarder">
        <div className="gallery-structure">
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448382854_433425723002021_322730606038257418_n.jpg" className="gallery" alt="Gallery Image 2" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448384990_1168812430832860_4955066018380239775_n.jpg" className="gallery" alt="Gallery Image 3" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448486285_823421776039789_3050443644981945686_n.jpg" className="gallery" alt="Gallery Image 1" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448488212_872509851377723_8733717060819786637_n.jpg" className="gallery" alt="Gallery Image 2" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448491759_986454036425003_6595243150635016595_n.jpg" className="gallery" alt="Gallery Image 3" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
