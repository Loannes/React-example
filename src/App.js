import './App.css';
import { useState } from 'react'

import Header  from './components/Header'
import Nav     from './components/Nav'
import Article from './components/Article'
import Create  from './components/Create'
import Update  from './components/Update'

function App() {
  const [ mode, setMode ]     = useState( 'WELCOME' );
  const [ id, setId ]         = useState( null );
  const [ nextId, setNextId ] = useState(4);
  const [ topics, setTopics ] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ])

  let content        = null;
  let contextControl = null;

  if ( mode === 'WELCOME' ) {
    content = <Article title={ mode } body="Hello Web"></Article>
  } else if ( mode === 'READ' ) {
    let title, body = null;
    for( let i =0; i<topics.length; i++ ){
      if ( topics[ i ].id === id ) {
        title = topics[ i ].title;
        body = topics[ i ].body;
      }
    }
    content = <Article title={ title } body={ body }></Article>
    contextControl = <>
      <li>
        <a href={ '/update/' + id } onClick={ ( event ) => {
          event.preventDefault();
          setMode( 'UPDATE' );
        }}>Update</a>
      </li>
      <li>
        <input type="button" value="Delete" onClick={ (event) => {
          const newTopics = [];
          for ( let i = 0; i < topics.length; i++ ) {
            if ( topics[ i ].id !== id) {
              newTopics.push(topics[ i ]);
            }
          }
          setTopics( newTopics );
          setMode( 'WELCOME' );
        }} />
      </li>
    </>
  } else if ( mode === 'CREATE') {
    content = <Create onCreate={ (_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body };
      const newTopics = [...topics];
      newTopics.push( newTopic );
      setTopics( newTopics );
      setMode( 'READ' );
      setId( nextId );
      setNextId( nextId + 1);
    }}></Create>
  } else if ( mode === 'UPDATE' ) {
    let title, body = null;
    for( let i =0; i<topics.length; i++ ){
      if ( topics[ i ].id === id ) {
        title = topics[ i ].title;
        body = topics[ i ].body;
      }
    }
    content = <Update title={ title } body={ body } onUpdate={ (_title, _body) => {
      const newTopics = [...topics];
      const updatedTopic = { id: id, title: _title, body: _body }
      for ( let i=0; i<newTopics.length; i++ ) {
        if (newTopics[ i ].id === id) {
          newTopics[ i ] = updatedTopic;
          break;
        }
      }
      setTopics( newTopics );
      setMode( 'READ' )
    }}></Update>
  }

  return (
    <div>
      <Header title="React" onChangeMode={ () => {  setMode( 'WELCOME' ) }}></Header>
      <Nav topics={ topics } onChangeMode={ ( _id ) => {
        setMode( 'READ' );
        setId( _id )
      }}></Nav>
      { content }
      <ul>
        <li>
          <a href="/create" onClick={ (event) => {
            event.preventDefault();
            setMode( 'CREATE' );
          }}>Create</a>
        </li>
        { contextControl }
      </ul>
      
    </div>
  );
}

export default App;
