import { useSelector } from "react-redux";

import { NavLink } from 'react-router-dom';

function List( props ) {
  const { topics } = useSelector(state => ({
    topics: state.topics.list
  }));
  
  const lst = []
  for(let i=0; i < topics.length; i++) {
    let t = topics[i];
    lst.push(
      <li key={ t.id }>
        <NavLink to={ '/detail/' + t.id }>{ t.title }</NavLink>
      </li>
    )
  }
  return (
    <>
      <h2>List</h2>
      <nav>
        <ol>
          {lst}
        </ol>
      </nav>
    </>
  )
}


export default List;