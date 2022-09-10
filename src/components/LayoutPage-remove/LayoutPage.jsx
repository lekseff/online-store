import Layout from '../Layout/Layout';
import Header from '../../containers/Header/Header';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';

function LayoutPage({ children }) {
  return (
    <>
      <Header />
      <Layout>
        <Banner />
        {children}
        <Footer />
      </Layout>
    </>
  );
}

export default LayoutPage;
