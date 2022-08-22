import { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { update } from '../modules/topics';

function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { id }     = useParams();
  const { topics } = useSelector(state => ({
      topics: state.topics.list
  }));

  const topic = topics.find( ( topic ) => topic.id === Number( id ) );

  const [ title, setTitle ] = useState( topic?.title || 'Opps' );
  const [ body, setBody ]   = useState( topic?.body  || 'Empty!!' );

  const onSubmit = event => {
    event.preventDefault();
    
    const title = event.target.title.value;
    const body = event.target.body.value;

    dispatch(update( Number( id ), title, body )); 

    navigate("/detail/" + id);
  }; 

  return <article>
    <h2>Update</h2>
    <form onSubmit={ onSubmit }>
      <p>
        <input type="text" name="title" placeholder="title" value={ title } onChange={ (event) => {
          setTitle(event.target.value)
        }}></input>
      </p>
      <p>
        <textarea name="body" placeholder="body" value={ body } onChange={ (event) => {
          setBody(event.target.value)
        }}></textarea>
      </p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}

export default Update;