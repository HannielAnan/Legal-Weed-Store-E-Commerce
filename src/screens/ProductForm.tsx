import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Firestore instance
import { collection, doc, setDoc } from "firebase/firestore"; // Firestore methods
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage methods
import { auth } from "../firebaseConfig"; // Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Auth state change listener

const ProductForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [interestFreePayments, setInterestFreePayments] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [storeDetails, setStoreDetails] = useState("");
  const [description, setDescription] = useState("");
  const [labReport, setLabReport] = useState("");
  const [shippingDetails, setShippingDetails] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [prices, setPrices] = useState([{ quantity: "", price: "" }]); // Dynamic pricing
  const [photos, setPhotos] = useState<File[]>([]); // Product photos
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storage = getStorage(); // Initialize Firebase Storage

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user.email);
        setIsAuthenticated(true);
      } else {
        console.error("User is not authenticated");
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle adding new price fields
  const addPriceField = () => {
    setPrices([...prices, { quantity: "", price: "" }]);
  };

  // Handle removing a price field
  const removePriceField = (index: number) => {
    const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
  };

  // Handle price field changes
  const handlePriceChange = (index: number, field: string, value: string) => {
    const updatedPrices = prices.map((price, i) =>
      i === index ? { ...price, [field]: value } : price
    );
    setPrices(updatedPrices);
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files)); // Store files in state
    }
  };

  const uploadPhotos = async () => {
    const photoUrls: string[] = [];
    for (const photo of photos) {
      const storageRef = ref(storage, `products/${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {}, // Optional: Track progress here
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            photoUrls.push(url);
            resolve();
          }
        );
      });
    }
    return photoUrls;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const photoUrls = await uploadPhotos(); // Upload photos first

      const productRef = doc(collection(db, "products")); // Create document reference with an ID
      const productId = productRef.id; // Extract the generated ID

      const productDetails = {
        id: productId, // Include the ID in the product data
        productName,
        priceRange,
        interestFreePayments,
        prices, // Include dynamic pricing
        deliveryOption,
        storeDetails,
        description,
        labReport,
        shippingDetails,
        returnPolicy,
        photos: photoUrls, // Save uploaded photo URLs
        createdAt: new Date(),
      };

      // Save product details to Firestore
      await setDoc(productRef, productDetails); // Explicitly set the document
      setSuccessMessage("Product added successfully!");
      setErrorMessage(null);

      // Reset form fields
      setProductName("");
      setPriceRange("");
      setInterestFreePayments("");
      setPrices([{ quantity: "", price: "" }]); // Reset prices
      setDeliveryOption("");
      setStoreDetails("");
      setDescription("");
      setLabReport("");
      setShippingDetails("");
      setReturnPolicy("");
      setPhotos([]); // Reset photos
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("Failed to add the product. Please try again.");
      setSuccessMessage(null);
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to access this page.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Add a New Product</h2>
      {successMessage && <p style={styles.success}>{successMessage}</p>}
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <label style={styles.label}>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Price Range:</label>
        <input
          type="text"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Interest-Free Payments:</label>
        <input
          type="text"
          value={interestFreePayments}
          onChange={(e) => setInterestFreePayments(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Set Prices (By Quantity):</label>
        {prices.map((price, index) => (
          <div key={index} style={styles.priceField}>
            <input
              type="text"
              placeholder="Quantity (e.g., 1g, 1oz)"
              value={price.quantity}
              onChange={(e) =>
                handlePriceChange(index, "quantity", e.target.value)
              }
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Price"
              value={price.price}
              onChange={(e) =>
                handlePriceChange(index, "price", e.target.value)
              }
              required
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => removePriceField(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addPriceField} style={styles.addButton}>
          Add Price Field
        </button>

        <label style={styles.label}>Photos:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
        />

        <label style={styles.label}>Store Details:</label>
        <textarea
          value={storeDetails}
          onChange={(e) => setStoreDetails(e.target.value)}
          required
          style={styles.textarea}
        />

        <label style={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />

        <label style={styles.label}>Lab Report:</label>
        <input
          type="text"
          value={labReport}
          onChange={(e) => setLabReport(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Shipping Details:</label>
        <textarea
          value={shippingDetails}
          onChange={(e) => setShippingDetails(e.target.value)}
          required
          style={styles.textarea}
        />

        <label style={styles.label}>Return Policy:</label>
        <textarea
          value={returnPolicy}
          onChange={(e) => setReturnPolicy(e.target.value)}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    margin: "10px 0 5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "80px",
  },
  priceField: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  addButton: {
    padding: "8px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  removeButton: {
    padding: "8px",
    fontSize: "14px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default ProductForm;
