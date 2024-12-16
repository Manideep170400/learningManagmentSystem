import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About Us</Link>
        <Link to="/contact" style={styles.link}>Contact Us</Link>
        {!isLoggedIn ? (
          <Link to="/login" style={styles.link}>Login</Link>
        ) : (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: 'white',
    
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    marginLeft:'auto',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;