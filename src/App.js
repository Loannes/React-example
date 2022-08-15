import './App.css';
// import { useState } from 'react'

import Header  from './components/Header'
import Nav     from './components/Nav'
import Article from './components/Article'
import Create  from './components/Create'
import Update  from './components/Update'

import { useSelector, useDispatch } from "react-redux";
import { changeMode, destroy } from './modules/topics';

function App( prop ) {
  const dispatch = useDispatch();

  const { mode, topics, selectedID } = useSelector(state => ({
    mode: state.topics.mode,
    topics: state.topics.list,
    selectedID: state.topics.selectedID,
  }));

  let content        = null;
  let contextControl = null;

  if ( mode === 'WELCOME' ) {
    content = <Article title={ mode } body="Hello Web"></Article>
  } else if ( mode === 'READ' ) {
    
    let topic = topics.find( ( topic ) => topic.id === selectedID );
    let title = topic?.title;
    let body  = topic?.body;

    content = <Article title={ title } body={ body }></Article>
    contextControl = <>
      <li>
        <a href={ '/update/' + selectedID } onClick={ ( event ) => {
          event.preventDefault();
          dispatch( changeMode( 'UPDATE') );
        }}>Update</a>
      </li>
      <li>
        <input type="button" value="Delete" onClick={ (event) => {
          dispatch( destroy( selectedID ));
        }} />
      </li>
    </>
  } else if ( mode === 'CREATE') {
    content = <Create />
  } else if ( mode === 'UPDATE' ) {
    let topic = topics.find( ( topic ) => topic.id === selectedID );
    let id    = topic?.id;
    let title = topic?.title;
    let body  = topic?.body;

    content = <Update id={ id } title={ title } body={ body } />
  }

  

  return (
    <div>
      <Header title="React" />
      <Nav onChangeMode={ ( _id ) => {
        dispatch( changeMode( 'READ' ) );
        // setId( _id )
      }}></Nav>
      { content }
      <ul>
        <li>
          <a href="/create" onClick={ (event) => {
            event.preventDefault();
            dispatch( changeMode( 'CREATE' ) );
          }}>Create</a>
        </li>
        { contextControl }
      </ul>
      
    </div>
  );
}

export default App;
