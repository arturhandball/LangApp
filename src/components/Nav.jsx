import { Link } from 'react-router-dom';

function Nav() {
	return (
	<nav className="nav">
		<ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/learn">Learn</Link></li>
        </ul>
	</nav>
	);
}

export default Nav;