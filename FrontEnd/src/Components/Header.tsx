import { Link } from "@reach/router";

const Header = () => {
	return (
		<div className="header">
			<Link to="/">
				<h1>A Spot of Pottery Chat</h1>
			</Link>
			{/* <p>Welcome {user}</p> */}
			<p>Welcome Justin</p>
		</div>
	);
};

export default Header;
