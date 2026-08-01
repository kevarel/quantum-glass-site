import { useState, useEffect, useCallback } from 'react';
import '../styles/gallery.css';

const images = [
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/8f2e2027-008a-4656-8b51-0b9e6713187e.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/bda1f004-e29a-4296-afa5-701d27ccff17.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/b1b7c3e7-0d48-4802-a8be-3a98ec2f73a6.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/9ac6ef28-76a4-49c8-a13b-ebdf23e99bf6.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/b4e7ff76-0f5b-43f0-bda4-6bc8aa4d60bb.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/c71802c8-243d-466e-88f5-de2c3f50667e.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/864292fd-6a10-4195-966b-3614197897e6.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/7e77eb94-3915-4f25-bce1-2efd11d2e4d7.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/137bd049-fa37-4e47-8f90-72d4b8a85f8a.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/2c5a709b-4a7f-4697-870f-64460c89c9a2.jpeg", alt: "Shower glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/d1d37384-85af-44d2-a24a-bd3adfb05137.jpeg", alt: "Shower glass installation" },
  { src: "https://quantum-glass-site.s3.amazonaws.com/images/448382854_433425723002021_322730606038257418_n.jpg", alt: "Shower glass installation" },
  { src: "https://quantum-glass-site.s3.amazonaws.com/images/448384990_1168812430832860_4955066018380239775_n.jpg", alt: "Glass door installation" },
  { src: "https://quantum-glass-site.s3.amazonaws.com/images/448486285_823421776039789_3050443644981945686_n.jpg", alt: "Shower enclosure" },
  { src: "https://quantum-glass-site.s3.amazonaws.com/images/448488212_872509851377723_8733717060819786637_n.jpg", alt: "Bathroom glass work" },
  { src: "https://quantum-glass-site.s3.amazonaws.com/images/448491759_986454036425003_6595243150635016595_n.jpg", alt: "Custom glass project" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/cd3c8565-74b5-4023-b892-efd01a25c4d6.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/552572b3-b502-48d5-97a9-62973843291b.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/a66a17cd-d48c-439c-af1d-9a9bb83c8fa8.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/b4bed6f1-6552-4910-9199-6339da6d9371.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/9a3172d1-4c97-4dee-9aee-6707383ff271.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/06452387-8bdf-4dd5-95e3-f59efad25cc1.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/a60c52df-e6d7-465b-86ae-e4cd2f3b6c6c.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/042f5cd6-1769-44e0-a13d-b1c03c6e39d0.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/f0e09858-f047-4b85-8997-9f31477a06ad.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/e482a9c1-5a1c-43d1-947a-de94ac406e9d.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/24faff93-1e1c-4f2e-9d6e-e1cc47fa64c3.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/108195ab-83cb-4615-ba6c-bd68a326789b.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/10da9575-8b06-4ace-9d2b-6b49bb987761.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/68b91392-663c-490d-b75c-b4baa41c96a1.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/3f7aa28b-b180-467a-a6d8-e7521ef9ed5c.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/159206c5-7da6-410b-85b0-80587acc1a19.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/22b53b86-8e14-45eb-9da3-2f7764877f73.jpg", alt: "Glass installation" },
  { src: "https://quantum-glass-site.s3.us-east-1.amazonaws.com/images/07647648-463c-48de-ba21-b32dc2784698.jpg", alt: "Glass installation" },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage, closeLightbox]);

  return (
    <div className="gallery-page">
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image">
            &times;
          </button>
          <img
            src={selectedImage}
            className="lightbox-image"
            alt="Expanded view"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="gallery-boarder">
        <h2 className="gallery-title">Gallery</h2>
        <div className="gallery-structure">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              className="gallery"
              alt={image.alt}
              onClick={() => setSelectedImage(image.src)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
