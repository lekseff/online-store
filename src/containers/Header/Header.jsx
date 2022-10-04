import React from 'react';
import Logo from '../../components/Logo/Logo';
import HeaderLayout from '../../components/HeaderLayout/HeaderLayout';
import NavList from '../../components/NavList/NavList';
import NavControls from '../../components/NavControls/NavControls';
import NavPanel from '../../components/NavPanel/NavPanel';
import getPath from '../../utils/getPath';

function Header() {
  // Список элементов меню
  const navItems = [
    { name: 'Главная', link: getPath() },
    { name: 'Каталог', link: getPath('/catalog') },
    { name: 'О магазине', link: getPath('/about') },
    { name: 'Контакты', link: getPath('/contacts') },
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
