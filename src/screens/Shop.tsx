import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { ProductCard } from '../components/ProductCard';
import { Header } from '../components/Header';
import './Shop.css';

interface Product {
  id: string;
  productName: string;
  photos: string[];
  prices: { price: string }[];
  description: string;
  priceRange: string;
}

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList: Product[] = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          productName: doc.data().productName,
          photos: doc.data().photos || [],
          prices: doc.data().prices || [],
          description: doc.data().description,
          priceRange: doc.data().priceRange || '',
        }));
        setProducts(productsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product`, { state: { item: product } });
  };

  return (
    <>
      <Header title="Shop" burger={true} basket={true} line={true} />
      <div className="shop-container">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : products.length ? (
          products.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.photos[0] || 'https://via.placeholder.com/300'}
                alt={product.productName}
              />
              <h3>{product.productName}</h3>
              <p>${parseFloat(product.prices?.[0]?.price || '0').toFixed(2)}</p>
              {product.prices[1] && (
                <p style={{ textDecoration: 'line-through' }}>
                  ${parseFloat(product.prices[1]?.price).toFixed(2)}
                </p>
              )}
              <p>Rating: 4.5 ★</p>
            </div>
          ))
        ) : (
          <p className="error">No products available.</p>
        )}
      </div>
    </>
  );
};
