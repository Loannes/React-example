import Top     from './pages/Top'
import Home  from './pages/Home'
import About   from './pages/About'
import Detail  from './pages/Detail'

import List     from './components/List'
import Create   from './components/Create'
import Update   from './components/Update'

import { useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';

import { changeMode } from './modules/topics';


// npm install redux
// npm install react-router-dom
// npm install qs

function App( prop ) {
  const dispatch = useDispatch();

  return (
    <div>
      <Top />

      <List onChangeMode={ ( _id ) => {
        dispatch( changeMode( 'READ' ) );
      }}></List>

      <hr />
      <Routes>
          <Route path="/" exact={true} element={ <Home /> } />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
