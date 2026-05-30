import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>404 — Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default PageNotFound;

