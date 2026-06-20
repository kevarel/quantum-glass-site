import '../../gallery.css';


const Gallery: React.FC = () => {
  return (
    <div className="gallery-page">
      <div className="gallery-boarder">
        <h2 className="gallery-title">Gallery</h2>
        <div className="gallery-structure">
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448382854_433425723002021_322730606038257418_n.jpg" className="gallery" alt="Shower glass installation" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448384990_1168812430832860_4955066018380239775_n.jpg" className="gallery" alt="Glass door installation" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448486285_823421776039789_3050443644981945686_n.jpg" className="gallery" alt="Shower enclosure" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448488212_872509851377723_8733717060819786637_n.jpg" className="gallery" alt="Bathroom glass work" />
          <img src="https://quantum-glass-site.s3.amazonaws.com/images/448491759_986454036425003_6595243150635016595_n.jpg" className="gallery" alt="Custom glass project" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
