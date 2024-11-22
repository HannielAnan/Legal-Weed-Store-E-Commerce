// ProductCard.tsx
interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  oldPrice?: number; // Allow oldPrice to be undefined
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
    <div>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>Price: ${price}</p>
      {oldPrice !== undefined && <p>Old Price: ${oldPrice}</p>} {/* Render only if oldPrice exists */}
      <p>Rating: {rating} stars ({reviewCount} reviews)</p>
    </div>
  );
};
