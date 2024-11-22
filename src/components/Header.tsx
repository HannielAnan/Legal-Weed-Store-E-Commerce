import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';

import { hooks } from '../hooks';
import { svg } from '../assets/svg';
import { theme } from '../constants';
import Logo from '../assets/LOGO.webp';

type Props = {
  title?: string;
  line?: boolean;
  burger?: boolean;
  goBack?: boolean;
  basket?: boolean;
};

export const Header: React.FC<Props> = ({ line, title, burger, goBack, basket }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const backdropAnimation = useSpring({
    opacity: modal ? 1 : 0,
    display: modal ? 'block' : 'none',
  });

  const handleGoBack = () => navigate(-1);
  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const renderGoBack = () => (
    goBack ? (
      <button onClick={handleGoBack} style={{ position: 'absolute', left: 0, padding: 20, cursor: 'pointer' }}>
        <svg.GoBackSvg />
      </button>
    ) : null
  );

  const renderBurger = () => (
    burger ? (
      <button onClick={toggleModal} style={{ position: 'absolute', left: 0, padding: 20, cursor: 'pointer' }}>
        <svg.BurgerSvg />
      </button>
    ) : null
  );

  const renderLogo = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
      <img src={Logo} alt="Logo" style={{ height: '60px' }} />
    </div>
  );

  const renderModal = () => (
    <animated.div style={{width: '12%', position: 'fixed', height: '100%', zIndex: 999999, backgroundColor: theme.colors.mainColor, ...backdropAnimation }}>
      <h2 style={{ padding: '0 20px', ...theme.fonts.Mulish_700Bold, fontSize: 22, textTransform: 'capitalize', marginBottom: 30 }}>Menu</h2>

      {/* List-Based Menu */}
      <ul style={{ listStyleType: 'none', padding: '20px 0', margin: 0 }}>
      <li 
          style={{ padding: '10px 20px', cursor: 'pointer', color: theme.colors.white, borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
          onClick={() => navigate('/Home')}
        >
          Home
        </li>
        <li 
          style={{ padding: '10px 20px', cursor: 'pointer', color: theme.colors.white, borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
          onClick={() => navigate('/aboutus')}
        >
          About Us
        </li>
        <li 
          style={{ padding: '10px 20px', cursor: 'pointer', color: theme.colors.white, borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
          onClick={() => navigate('/events')}
        >
          Events
        </li>
        <li 
          style={{ padding: '10px 20px', cursor: 'pointer', color: theme.colors.white, borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
          onClick={() => navigate('/videos')}
        >
          Videos
        </li>
        <li 
          style={{ padding: '10px 20px', cursor: 'pointer', color: theme.colors.white, borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
          onClick={() => navigate('/products')}
        >
          Products
        </li>
        <li 
          style={{ padding: '10px 20px', cursor: 'pointer', color: theme.colors.white, borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
          onClick={() => navigate('/careers')}
        >
          Careers
        </li>
        <li 
          style={{ padding: '10px 20px', cursor: 'pointer', color: theme.colors.white }}
          onClick={() => navigate('/shop')}
        >
          Shop
        </li>
      </ul>
    </animated.div>
  );

  const renderOverlay = () => (
    <animated.div onClick={toggleModal} style={{ width: '100%', height: '100vh', backgroundColor: 'rgba(25, 51, 100, 0.6)', position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden', ...backdropAnimation }} />
  );

  return (
    <>
      {modal && renderOverlay()}
      {modal && renderModal()}
      <header style={{ top: 0, height: 52, position: 'sticky', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: theme.colors.white, zIndex: 4, borderBottom: line ? `1px solid ${theme.colors.aliceBlue2}` : 'none' }}>
        {renderGoBack()}
        {renderBurger()}
        {renderLogo()}
      </header>
    </>
  );
};
