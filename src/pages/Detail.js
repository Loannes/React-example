import { useSelector, useDispatch } from "react-redux";

import { NavLink, useParams, useNavigate } from "react-router-dom";

import { destroy } from '../modules/topics';

import Article     from '../components/Article'

function Detail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const { topics } = useSelector(state => ({
        topics: state.topics.list
    }));

    const topic = topics.find( ( topic ) => topic.id === Number( id ) );
    let title = topic?.title || 'Opps';
    let body  = topic?.body  || 'Empty!!';

    let contextControl = null;
    if (title !== null) {
        contextControl = <>
        <li>
            <NavLink to={ '/update/' + id }>UPDATE</NavLink>
        </li>
        <li>
            <input type="button" value="Delete" onClick={ (event) => {
                dispatch( destroy( Number( id ) ) );
                navigate("/");
            }} />
        </li>
        </>
    }
    
    return (
        <>
            <Article title={ title } body={ body }></Article>
            <hr />
            { contextControl }
        </>
        
    )
}
  
export default Detail;