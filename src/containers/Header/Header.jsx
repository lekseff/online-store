import React from 'react';
import Logo from '../../components/Logo/Logo';
import HeaderLayout from '../../components/HeaderLayout/HeaderLayout';
import NavList from '../../components/NavList/NavList';
import NavControls from '../../components/NavControls/NavControls';
import NavPanel from '../../components/NavPanel/NavPanel';

function Header() {
  // Список элементов меню
  const navItems = [
    { name: 'Главная', link: '/' },
    { name: 'Каталог', link: '/catalog' },
    { name: 'О магазине', link: '/about' },
    { name: 'Контакты', link: '/contacts' },
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
