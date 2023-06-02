import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import {Spinner} from 'components/Spinner';
import Header from 'components/Header';

import {MainContainer} from './styles';

const Layout = () => {
  return (
    <MainContainer>
      <Suspense fallback={<Spinner/>}>
        <Header/>
        <Outlet/>
      </Suspense>
    </MainContainer>
  );
};

export default Layout;
