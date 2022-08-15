import { useDispatch } from 'react-redux';
import { create } from '../modules/topics';

function Create( props ) {
  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    
    const title = event.target.title.value;
    const body = event.target.body.value;

    dispatch(create( title, body )); 
  };

  return <article>
    <h2>Create</h2>
    <form onSubmit={ onSubmit }>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

export default Create;