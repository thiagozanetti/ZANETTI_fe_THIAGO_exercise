import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import {Spinner} from 'components/Spinner';
import Header from 'components/Header';
import {useAppSelector} from 'state/hooks';


const Layout = () => {
  const {title, showBackButton} = useAppSelector(({header}) => header);

  return (
    <main>
      <Suspense fallback={<Spinner/>}>
        <Header title={title} showBackButton={showBackButton} />
        <Outlet/>
      </Suspense>
    </main>
  );
};

export default Layout;