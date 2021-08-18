import { RouteComponentProps, Link } from "@reach/router";

interface props extends RouteComponentProps {
	posts: { postId: number; desc: string; url: string }[];
}

const Posts = ({ posts }: props) => {
	return (
		<ul className="posts">
			{posts.map((post) => {
				const { postId, desc, url } = post;
				return (
					<li className="pots" key={postId}>
						<Link to={`/posts/${postId}`}>
							<img alt={desc} src={url} className="img" />
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default Posts;
