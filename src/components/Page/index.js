import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import background from 'src/assets/img/background2.jpg';
import Menu from '../Menu';

import './style.scss';

function Page() {
  const location = useLocation();
  const page = useRef(null);

  useEffect(() => {
    page.current.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="Page" ref={page} style={{ background: `url(${background}) no-repeat center center / cover` }}>
      <Menu />
      <Outlet />
    </main>
  );
}

export default Page;
