import {Outlet} from 'react-router-dom';
import {useEffect} from 'react';

const BasicLayout = () => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
};

export default BasicLayout;
