import { Link } from "react-router-dom";

function Games() {
	return (
	<div className="games">
		<ul>
			<li>
				<Link to="/games/1">Speak and check</Link>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
			</li>
		</ul>
		<ul>
			<li>
				<Link to="/games/2">Write it</Link>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
			</li>
		</ul>
		<ul>
			<li>
				<Link to="/games/3">Put it</Link>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
			</li>
		</ul>
		<ul>
			<li>
				<Link to="/games/4">Speak It</Link>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
			</li>
		</ul>
		<ul>
			<li>
				<Link to="/games/5">Check translate</Link>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
			</li>
		</ul>
		<ul>
			<li>
				<Link to="/games/6">Remember me</Link>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
			</li>
		</ul>
	</div>
	);
}

export default Games;