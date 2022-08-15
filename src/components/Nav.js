import { useSelector, useDispatch } from "react-redux";
import { changeMode, setSelectedID } from '../modules/topics';

function Nav( props ) {
  const dispatch = useDispatch();

  const { topics } = useSelector(state => ({
    topics: state.topics.list
  }));
  
  const lst = []
  for(let i=0; i < topics.length; i++) {
    let t = topics[i];
    lst.push(
      <li key={ t.id }>
        <a id={ t.id } href={ '/read/' + t.id } onClick={ (event) => {
          event.preventDefault();
          dispatch( changeMode( 'READ' ) );
          dispatch( setSelectedID( t.id ) );
        }}>{ t.title }</a>
      </li>
    )
  }
  return <nav>
    <ol>
      {lst}
    </ol>
  </nav>
}


export default Nav;