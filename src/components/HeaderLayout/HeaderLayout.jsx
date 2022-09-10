function HeaderLayout({ children }) {
  return (
    <header className='container'>
      <div className='row'>
        <div className='col'>{children}</div>
      </div>
    </header>
  );
}

export default HeaderLayout;
