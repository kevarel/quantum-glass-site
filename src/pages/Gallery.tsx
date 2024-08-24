import { Link } from 'react-router-dom';
// import React, { useEffect, useState, useRef } from 'react';


// const images = [
//   "https://quantum-glass-site.s3.amazonaws.com/images/448382854_433425723002021_322730606038257418_n.jpg",
//   "https://quantum-glass-site.s3.amazonaws.com/images/448384990_1168812430832860_4955066018380239775_n.jpg",
//   "https://quantum-glass-site.s3.amazonaws.com/images/448486285_823421776039789_3050443644981945686_n.jpg",
//   "https://quantum-glass-site.s3.amazonaws.com/images/448488212_872509851377723_8733717060819786637_n.jpg",
//   "https://quantum-glass-site.s3.amazonaws.com/images/448491759_986454036425003_6595243150635016595_n.jpg",
// ];

const Gallery: React.FC = () => {
  // const [visibleImages, setVisibleImages] = useState<string[]>([]);
  // const [loadIndex, setLoadIndex] = useState(0);
  // const loaderRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   // Load initial images
  //   setVisibleImages(images.slice(0, 3));
  //   setLoadIndex(3);
  // }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       loadMoreImages();
  //     }
  //   });

  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current);
  //     }
  //   };
  // }, [loaderRef.current]);

  // const loadMoreImages = () => {
  //   setVisibleImages((prevImages) => [
  //     ...prevImages,
  //     ...images.slice(loadIndex, loadIndex + 3),
  //   ]);
  //   setLoadIndex((prevIndex) => prevIndex + 3);
  // };

  return (
    <div>
      <nav className="landing-nav">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/gallery" className="nav-button">Gallery</Link>
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
    // <div className="gallery-container">
    //   <h2>Gallery Page</h2>
    //   {visibleImages.map((src, index) => (
    //     <img
    //       key={index}
    //       className="gallery-image"
    //       src={src}
    //       alt={`Gallery image ${index + 1}`}
    //       loading="lazy"
    //     />
    //   ))}
    //   <div ref={loaderRef} />
    // </div>
  );
};

export default Gallery;
