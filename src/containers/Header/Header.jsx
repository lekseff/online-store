import React from 'react';
import Logo from '../../components/Logo/Logo';
import HeaderLayout from '../../components/HeaderLayout/HeaderLayout';
import NavList from '../../components/NavList/NavList';
import NavControls from '../../components/NavControls/NavControls';
import NavPanel from '../../components/NavPanel/NavPanel';

function Header() {
  // Список элементов меню
  const navItems = [
    { name: 'Главная', link: '/online-store' },
    { name: 'Каталог', link: '/online-store/catalog' },
    { name: 'О магазине', link: '/online-store/about' },
    { name: 'Контакты', link: '/online-store/contacts' },
  ];

  return (
    <HeaderLayout>
      <NavPanel logo={<Logo />}>
        <NavList items={navItems} />
        <NavControls />
      </NavPanel>
    </HeaderLayout>
  );
}

export default React.memo(Header);
