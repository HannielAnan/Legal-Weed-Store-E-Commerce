import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { components } from '../components';
import { theme } from '../constants';

export const Product: React.FC = () => {
  const location = useLocation();
  const { item } = location.state || {}; // Get the full product object from state

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log('Product received:', item);
    if (!item) {
      alert('Product details are missing. Please navigate to this page from the shop.');
    }
  }, [item]);

  const handleSlideChange = (index: number) => {
    console.log('Carousel slide changed to index:', index);
    setActiveIndex(index);
  };

  if (!item) {
    return <div>No product details available.</div>;
  }

  return (
    <>
      <components.Header goBack={true} line={true} basket={true} />
      <div style={{ padding: '0 0 20px 0' }}>
        {/* Carousel for product images */}
        <div style={{ marginBottom: 22 }}>
          <Carousel
            infiniteLoop={false}
            showStatus={false}
            showThumbs={false}
            thumbWidth={22}
            showIndicators={false}
            showArrows={false}
            onChange={handleSlideChange}
            swipeable={true}
            emulateTouch={true}
          >
            {item.photos?.map((photo: string, index: number) => (
              <img
                key={index}
                src={photo}
                alt="Product Carousel"
                style={{
                  width: '100%',
                  height: 350,
                  objectFit: 'contain',
                  backgroundColor: theme.colors.imageBackground,
                }}
              />
            ))}
          </Carousel>
        </div>

        {/* Indicators for the carousel */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
          {item.photos?.map((_: string, index: number) => (
            <div
              key={index}
              style={{
                background: index === activeIndex ? theme.colors.mainColor : '#E8EFF4',
                display: 'inline-block',
                width: 22,
                height: 6,
                margin: '0 5px',
                borderRadius: 6,
              }}
            />
          ))}
        </div>

        {/* Product title and price range */}
        <div style={{ padding: '0 20px' }}>
          <h3 style={{ ...theme.fonts.Mulish_700Bold, fontSize: 20, color: theme.colors.mainColor }}>
            {item.productName || 'Product Name Unavailable'}
          </h3>
          <div style={{ ...theme.fonts.Mulish_600SemiBold, fontSize: 20, color: theme.colors.mainColor }}>
            {item.priceRange || 'Price Range Unavailable'}
          </div>
          <p style={{ color: theme.colors.textColor }}>{item.description}</p>
        </div>
      </div>
    </>
  );
};
