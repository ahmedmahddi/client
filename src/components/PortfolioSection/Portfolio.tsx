import React, { useState, useMemo, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
}

const Portfolio: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const imagesPerPage = 6;

  const galleryImages: GalleryImage[] = [
    { id: 1, src: '/images/Gallery/shower.webp', title: 'Fenêtre Aluminium', category: 'Fenêtres' },
    { id: 2, src: '/images/Gallery/door.webp', title: 'Porte Entrée PVC', category: 'Portes' },
    { id: 3, src: '/images/Gallery/window.webp', title: 'Fenêtre PVC', category: 'Fenêtres' },
    { id: 4, src: '/images/Gallery/fence.webp', title: 'Porte Coulissante', category: 'Portes' },
    { id: 5, src: '/images/Gallery/mur.webp', title: 'Façade Aluminium', category: 'Façades' },
    { id: 6, src: '/images/garde-corp.jpg', title: 'Façade Commerciale', category: 'Façades' },
    { id: 7, src: '/images/Gallery/shower.webp', title: 'Fenêtre Aluminium', category: 'Fenêtres' },
    { id: 8, src: '/images/Gallery/door.webp', title: 'Porte Entrée PVC', category: 'Portes' },
    { id: 9, src: '/images/Gallery/window.webp', title: 'Fenêtre PVC', category: 'Fenêtres' },
    { id: 10, src: '/images/Gallery/fence.webp', title: 'Porte Coulissante', category: 'Portes' },
    { id: 11, src: '/images/Gallery/mur.webp', title: 'Façade Aluminium', category: 'Façades' },
    { id: 12, src: '/images/garde-corp.jpg', title: 'Façade Commerciale', category: 'Façades' },
  ];

  const categories = ['Tous', ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = useMemo(() => {
    return selectedCategory === 'Tous'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const currentImages = filteredImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      header.style.display = isOpen ? 'none' : 'block';
    }
    return () => {
      if (header) {
        header.style.display = 'block';
      }
    };
  }, [isOpen]);

  return (
    <div className="section-full content-inner-2 portfolio text-uppercase bg-gray" style={{marginBottom:"0px"}} id="portfolio">
      <div className="container">
        <div className="portfolio-filter text-center mb-4">
          {categories.map(category => (
            <button
              key={category}
              className={`site-button btnhover20 ${selectedCategory === category ? 'active' : ''} m-1`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              style={{
                backgroundColor: selectedCategory === category ? '#224067' : 'transparent',
                color: selectedCategory === category ? 'white' : '#224067',
                border: '1px solid #224067',
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '25px',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A5B5D1';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = selectedCategory === category ? '#224067' : 'transparent';
                e.currentTarget.style.color = selectedCategory === category ? 'white' : '#224067';
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="row">
          {currentImages.map((image, index) => (
            <div key={image.id} className="col-lg-4 col-md-6 col-sm-12 p-3">
              <div className="card h-100 shadow" onClick={() => openLightbox(index)}>
                <div className='custom-overlay'>
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                </div>

                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="card-title text-center mb-0 text-primary text-uppercase">{image.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-container text-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn ${currentPage === page ? 'active' : ''} m-1`}
                onClick={() => setCurrentPage(page)}
                style={{
                  backgroundColor: currentPage === page ? '#224067' : 'transparent',
                  color: currentPage === page ? 'white' : '#224067',
                  border: '1px solid #224067',
                  transition: 'all 0.3s ease',
                  padding: '5px 10px',
                  borderRadius: '5px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3a5a8a';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = currentPage === page ? '#224067' : 'transparent';
                  e.currentTarget.style.color = currentPage === page ? 'white' : '#224067';
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={currentImageIndex}
          slides={currentImages.map(img => ({ 
            src: img.src,
            title: img.title,
            description: img.category
          }))}
          plugins={[Thumbnails, Zoom, Download]}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true
          }}
          thumbnails={{
            position: "bottom",
            width: 75,
            height: 75,
            border: 0,
            gap: 8
          }}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 2147483647 },
            thumbnail: { 
              objectFit: 'cover',
              border: '2px solid #224067',
              borderRadius: '4px',
            },
          }}
          download={{
            download: ({ slide }) => {
              window.open(slide.src, '_blank');
            }
          }}
        />
      </div>
    </div>
  );
};

export default Portfolio;