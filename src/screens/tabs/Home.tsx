import axios from 'axios';
import {useState} from 'react';
import {useEffect, FC} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {URLS} from '../../config';
import {hooks} from '../../hooks';
import {items} from '../../items';
import {custom} from '../../custom';
import {theme} from '../../constants';
import {actions} from '../../store/actions';
import {components} from '../../components';

export const Home: FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigate = hooks.useAppNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const [activeIndex, setActiveIndex] = useState(0);

  const [productsData, setProductsData] = useState<any>([]);
  const [bannersData, setBannersData] = useState<any>([]);
  const [carouselData, setCarouselData] = useState<any>([]);

  const getData = async () => {
    setLoading(true);

    try {
      const products = await axios
        .get(URLS.GET_PRODUCTS)
        .then(res => res.data.products);

      const banners = await axios
        .get(URLS.GET_BANNERS)
        .then(res => res.data.banners);

      const carousel = await axios
        .get(URLS.GET_CAROUSEL)
        .then(res => res.data.carousel);

      setProductsData(products);
      setBannersData(banners);
      setCarouselData(carousel);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header burger={true} basket={true} line={true} />;
  };

  const renderCarousel = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'center', marginBottom: 22,  backgroundColor: 'black', fontFamily: 'Poppins, sans-serif' }}>
        <h1 style={{ color: '#00FF00', padding: '30px', fontWeight: 'bold', fontSize: '28px' }}>
          Reggie & Dro is a Cannabis Store & Social Club in San Antonio, Texas with
          "Dispensary" & Onsite Consumption "Smoking Lounge" Where Members 21+ Get{' '}
          <span style={{ color: '#FF0000' }}>
            FREE LEGAL WEED!
          </span>
        </h1>
  
        <p style={{  fontSize: '18px', marginTop: '20px', color: 'white', }}>
          Unlock the Ultimate Cannabis Experience?
          <br />
          Here's How:
          <br />
          Read Each Word, Complete 3 Simple Steps & Watch Videos Below 👇
        </p>
  
        <p style={{ color: '#FF0000', fontSize: '20px', fontWeight: 'bold' }}>
          Step 1) Verify Your Age & ID
        </p>
        <br></br>
        <p style={{ color: '#FF0000', fontSize: '20px', fontWeight: 'bold' }}>
          Step 2) Agree to Become a Member
        </p>
        <br></br>
        <p style={{ color: '#FF0000', fontSize: '20px', fontWeight: 'bold' }}>
          Step 3) Get Your First FREE Gram*
        </p>
        <br></br>
        <p style={{ color: '#00FF00', fontSize: '16px', fontStyle: 'italic' }}>
          *And Another FREE Gram Every Time You Review the Look, Smell, Taste & Effect Online.
        </p>
           {/* Add your video here */}
      <div style={{ marginTop: 30, width:"100%" }}>
        <video width="100%" height="400" controls poster="/thumb.webp">
          <source src="/video.mp4" width="100%" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{ marginTop: 20 }}>
       <img src="/poster.webp" alt="Poster Image" style={{ width: '100%', height: 'auto' }} />
     </div>
    </div>
       
      // </div>
    );
  };
  const renderTextSection = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'center', margin: '40px 0', fontFamily: 'Poppins, sans-serif' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF0000', marginBottom: '10px' }}>
          Try BEFORE You Buy.
          <br />
          SMOKE at Club.
          <br />
          <span style={{ fontSize: '32px' }}>🌺🔥💨﻿</span>
        </p>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF0000', marginBottom: '30px' }}>
          Come For The Flower,
          <br />
          Stay For The GOOD VIBES!
        </p>
        
        <p style={{ fontSize: '18px', color: '#00FF00', lineHeight: '1.6' }}>
          Join our exclusive "Reggie & Dro" Cannabis Store and Social Club, the original pioneer of the modern 
          <span style={{ fontWeight: 'bold' }}> THCA Dispensary </span> & On Site <span style={{ fontWeight: 'bold' }}>Cannabis Consumption Lounge</span>, 
          deep in the heart of Stone Oak, San Antonio, Texas. Don't miss the unique opportunity to see, smell, taste, 
          and experience the effects of <span style={{ fontWeight: 'bold', color: '#00FF00' }}>SMOKING Cannabis</span> 
          in our safe and exclusive <span style={{ fontWeight: 'bold' }}>Members-Only Social Club</span> where you can discover, 
          savor and explore free legal weed like nowhere else... 
          <span style={{ fontSize: '24px' }}>🌺🔥💨</span>
        </p>
        <p style={{ fontSize: '18px', color: '#FF0000', fontWeight: 'bold', marginTop: '20px' }}>
          Don't miss limited free membership offer!
        </p>
      </div>
    );
  };
  const renderFormSection = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'center', margin: '40px 0', fontFamily: 'Poppins, sans-serif', backgroundColor: '#FF3B3B', padding: '40px 20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '20px' }}>
          STEP 1) Verify Your Age & ID:
        </h2>
  
        <form style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="First Name"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="text"
            placeholder="Friend"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#006666',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%',
            }}
          >
            Start Verification
          </button>
        </form>
  
        <p style={{ color: '#FFFFFF', marginTop: '20px' }}>
          <a href="https://veriff.com" style={{ color: '#006666', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            Veriff
          </a>{' '}
          is an identity verification provider that helps companies connect with customers.
        </p>
        <div style={{ marginTop: 20 }}>
       <img src="/2ndposter.webp" alt="Poster Image" style={{ width: '100%', height: 'auto' }} />
     </div>
      </div>
    );
  };
  const renderMembershipSection = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'center', margin: '40px 0', fontFamily: 'Poppins, sans-serif', backgroundColor: '#F46B6B', padding: '40px 20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '10px' }}>
          STEP 2) Agree to Become a Member
        </h2>
        <p style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 'bold', marginBottom: '30px' }}>
          *AGE/ID VERIFICATION MUST BE APPROVED FIRST
        </p>
  
        <button
          type="button"
          style={{
            backgroundColor: '#90EE90',
            color: '#000',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Membership Agreement
        </button>
      </div>
    );
  };
  const renderMapAndVideoSection = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'center', margin: '0px 0', fontFamily: 'Poppins, sans-serif' }}>
        {/* Map Section */}
        <p style={{ fontSize: '16px', color: '#00FF00', fontWeight: 'bold', marginBottom: '10px' }}>
          We DELIVER to You ANYWHERE IN Texas!
          <br />
          ONLY $4.20 Flat Rate Shipping on Orders $100
          <br />
          FREE SHIPPING for Orders of $100+
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.064204187201!2d-98.4891188847065!3d29.615844981819803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c60fa09e54779%3A0xa743e3b6115c6bd!2sReggie%20%26%20Dro%20Cannabis%20Store!5e0!3m2!1sen!2sus!4v1633068594920!5m2!1sen!2sus"
          width="80%"
          height="450"
          style={{ border: 0, marginBottom: '20px' }}
          
          loading="lazy"
        ></iframe>
  
        {/* Video Section */}
        <h2 style={{ fontSize: '24px', color: 'rgb(255, 0, 0)', fontWeight: 'bold', marginBottom: '10px' }}>
          THCA? CBD? THC? Legal WEED?
        </h2>
        <h2 style={{ fontSize: '24px', color: 'rgb(255, 0, 0)', fontWeight: 'bold', marginBottom: '10px' }}>
        🌲﻿🥦🧬 Legal WEED?
        </h2>
        <p style={{ fontSize: '16px', color: '#FFA500', fontWeight: 'bold', marginBottom: '10px' }}>
          FAQ #1: "HOW is this LEGAL?"
        </p>
        <div style={{ marginBottom: '20px' }}>
          <iframe
            width="100%"
            height="350"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="THCA FAQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  };
  const renderBannerSection = (): JSX.Element => {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 0',
          background: 'linear-gradient(180deg, #00FF00 0%, #004400 100%)',
        }}
      >
        <img
          src="/poster3.webp"
          alt="Reggie & Dro Cannabis Store Poster"
          style={{
            maxWidth: '400px',
            width: '100%',
            borderRadius: '10px',
          }}
        />
      </div>
    );
  };
  const renderPricingPosterSection = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', backgroundColor: '#000', fontFamily: 'Poppins, sans-serif' }}>
        {/* Pricing Poster */}
        <img
          src="/4thposter.webp" // Replace with the actual path to the poster image
          alt="THCA Pricing Poster"
          style={{
            maxWidth: '400px',
            width: '100%',
            marginBottom: '20px',
          }}
        />
      </div>
    );
  };
  
  // const renderIndicator = (): JSX.Element => {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         marginBottom: 40,
  //       }}
  //     >
  //       {carouselData?.map((item: any, index: number) => {
  //         const isSelected = index === activeIndex;
  //         const indicatorStyle = {
  //           background: isSelected ? theme.colors.mainColor : '#E8EFF4',
  //           display: 'inline-block',
  //           width: 22,
  //           height: 6,
  //           margin: '0 6px',
  //           borderRadius: 6,
  //         };
  //         return <div style={indicatorStyle} key={index} />;
  //       })}
  //     </div>
  //   );
  // };

  const renderBestSellers = (): JSX.Element => {
    return (
      <div style={{marginBottom: 40, display: 'flex', flexDirection: 'column'}}>
        <components.BlockHeading
          title='Best sellers'
          containerStyle={{
            padding: '0 20px 0',
            marginBottom: 14,
          }}
          viewAllOnClick={() => {
            dispatch(actions.resetFilters());
            navigate('/Shop', {
              state: {products: productsData, title: 'Best sellers'},
            });
          }}
        />
        <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          {productsData?.map((item: any, index: number, arra: any) => {
            const isLast = index === arra.length - 1;
            return (
              <items.ProductCard
                key={item.id}
                isLast={isLast}
                item={item}
                version={1}
              />
            );
          })}
        </custom.ScrollView>
      </div>
    );
  };

  const renderBanner = (): JSX.Element => {
    const banner =
      bannersData && bannersData?.length > 0 ? bannersData[0]?.image : '';

    const matches = Array.isArray(productsData)
      ? productsData.filter(
          (product: any) => product.promotion === bannersData[0]?.promotion,
        )
      : [];
    return (
      <div style={{marginBottom: 40, display: 'flex'}}>
        <button
          onClick={() => {
            dispatch(actions.resetFilters());
            navigate('/Shop', {state: {products: matches}});
          }}
        >
          <img
            src={banner}
            alt='Banner'
            style={{
              width: '100%',
            }}
          />
        </button>
      </div>
    );
  };

  const renderFeatured = (): JSX.Element => {
    return (
      <div style={{marginBottom: 40, display: 'flex', flexDirection: 'column'}}>
        <components.BlockHeading
          title='Featured products'
          containerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 14,
          }}
          viewAllOnClick={() => {
            dispatch(actions.resetFilters());
            navigate('/Shop', {state: {products: productsData}});
          }}
        />
        <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          {productsData?.map((item: any, index: number, arra: any) => {
            const isLast = index === arra.length - 1;
            return (
              <items.ProductCard
                key={item.id}
                isLast={isLast}
                item={item}
                version={3}
              />
            );
          })}
        </custom.ScrollView>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) return <components.TabLoader />;

    return (
      <main
        style={{
          paddingBottom: 64,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderCarousel()}
        {/* {renderIndicator()} */}
        {renderTextSection()}
        {renderFormSection()} 
        {renderMembershipSection()}
        {renderMapAndVideoSection()}  
        {renderBannerSection()} 
        {renderPricingPosterSection()}
        {/* {renderBestSellers()}
        {renderBanner()}
        {renderFeatured()} */}
      </main>
    );
  };

  const renderBottomTabBar = () => {
   return <components.BottomTabBar />;
  };

  return (
    <>
      {renderHeader()} 
      {renderContent()}
      {renderBottomTabBar()} 
    </>
  );
};
