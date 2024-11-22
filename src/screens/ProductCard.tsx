import React from 'react';

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  oldPrice,
  rating,
  reviewCount,
}) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '300px',
        textAlign: 'center',
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <h3>{name}</h3>
      <p>
        ${price.toFixed(2)}{' '}
        {oldPrice && <span style={{ textDecoration: 'line-through' }}>${oldPrice.toFixed(2)}</span>}
      </p>
      <p>
        {rating} ★ ({reviewCount} reviews)
      </p>
    </div>
  );
};
