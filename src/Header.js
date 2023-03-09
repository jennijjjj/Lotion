const Header = ({showSidebar})=>{
    return (
  <header className="App-header">
    <div className='App-header-menu'>
      <button onClick={() => showSidebar()} id='header-menuIcon'>&#9776;</button>
    </div>
    <div className="App-header-title">
      <h1>Lotion</h1>
      <p>Like Notion, but worse.</p>
    </div>
  </header>
);
}
export default Header;