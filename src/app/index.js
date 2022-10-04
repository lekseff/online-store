import React from 'react';
import { useDispatch } from 'react-redux';
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
import storage from '../services/storage';
import { restoreBasket } from '../containers/Basket/basketSlice';

function App() {
  const dispatch = useDispatch();

  // Восстановление корзины из LocalStorage;
  React.useEffect(() => {
    const data = storage.getStorage();
    if (!data) return;
    dispatch(restoreBasket(data));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Layout>
        <Banner />
        <Routes>
          <Route path='/online-store' element={<HomePage />} />
          <Route path='/online-store/contacts' element={<ContactsPage />} />
          <Route path='/online-store/catalog/*' element={<CatalogPage />} />
          <Route path='/online-store/catalog/:id' element={<ProductPage />} />
          <Route path='/online-store/about' element={<AboutPage />} />
          <Route path='/online-store/cart' element={<BasketPage />} />
          <Route path='*' element={<NoFoundPage />} />
        </Routes>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
