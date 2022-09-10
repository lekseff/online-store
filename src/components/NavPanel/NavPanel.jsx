function NavPanel({ logo, children }) {
  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
      {logo}
      <div className='collapase navbar-collapse' id='navbarMain'>
        {children}
      </div>
    </nav>
  );
}

export default NavPanel;
