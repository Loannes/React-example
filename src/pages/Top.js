import { NavLink } from 'react-router-dom';

function Top() {
    return (
        <>
            <header>
                <h1><NavLink to="/">React</NavLink></h1>

                <hr/>

                <NavLink to="/about">소개</NavLink>
                &nbsp;|&nbsp;
                <NavLink to="/create">Create</NavLink>
                <hr/>
            </header>
        </>
    )
}
  
export default Top;