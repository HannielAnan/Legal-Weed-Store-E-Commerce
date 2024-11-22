import React from 'react';
import { Header } from '../components/Header'; // Adjust path based on your file structure

const AboutUs: React.FC = () => {
  return (
    <>
      <Header title="About Us" burger={true} basket={true} line={true} />
      
      <div style={styles.container}>
        {/* First Video Embed */}
        <div style={styles.videoContainer}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/first-video-id" 
            title="First Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        {/* About Us Content */}
        <div style={styles.textContainer}>
          <h2>About Us - Reggie & Dro LLC</h2>
          <p>Reggie & Dro LLC is dedicated to offering our customers a seamless and personalized shopping experience, emphasizing privacy, security, and service quality. Founded with a commitment to providing safe, transparent, and reliable services, we strive to ensure every interaction with our brand is grounded in trust and clarity. We recognize the importance of privacy in today's digital landscape and work diligently to protect our users' information with the latest security protocols and practices.</p>
          <p>We collect necessary details to enhance your experience on our site, including your name, contact information, and transaction details, helping us offer services and products tailored to your needs. Our active SSL certification, combined with regular malware scans, ensures that your data is handled securely, aligning with our goal to safeguard your experience while you explore our offerings, complete transactions, or engage with our customer support.</p>
          {/* Middle Video Embed */}
        <div style={styles.videoContainer}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/middle-video-id" 
            title="Middle Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
          <p>Our values are reflected in our commitment to transparency, from our Privacy Policy to our Terms of Service, both carefully crafted to protect and inform our users. We believe in respecting customer choice and prioritize clear, honest communication regarding our policies. Additionally, our website is optimized for a smooth, secure experience, with features like cookies used solely to improve your browsing experience.</p>
          <p>Please note that our products and services are available only to individuals over 21, respecting both legal guidelines and our commitment to responsible service. At Reggie & Dro LLC, your trust is paramount, and we continuously aim to provide a user-friendly, safe, and personalized shopping experience that meets the highest standards. For any questions, please reach out to us at <a href="mailto:high@reggieanddro.com">high@reggieanddro.com</a>.</p>
        </div>

        

        {/* Last Video Embed */}
        <div style={styles.videoContainer}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/last-video-id" 
            title="Last Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
  },
  videoContainer: {
    marginBottom: '20px',
  },
  textContainer: {
    textAlign: 'justify',
    marginBottom: '20px',
  }
};

export default AboutUs;
