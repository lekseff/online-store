import { Routes, Route } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import NoFoundPage from './pages/NoFoundPage';
import ProductPage from './pages/ProductPage';
import BasketPage from './pages/BasketPage';
import Header from '../containers/Header/Header';
import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout/Layout';
import Footer from '../components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Layout>
        <Banner />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path='/catalog/*' element={<CatalogPage />} />
          <Route path='/catalog/:id' element={<ProductPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/cart' element={<BasketPage />} />
          <Route path='*' element={<NoFoundPage />} />
        </Routes>
        <Footer />
      </Layout>
    </>
  );
}

export default App;