import "./App.css";
import { useState } from "react";
import Header from "./Components/Header";
import Posts from "./Components/Posts";
import SinglePost from "./Components/SinglePost";
import { Router} from "@reach/router";

function App() {
	
	// const [user, setUser] = useState("user1");

	return (
		<div className="App">
			{/* <Header user={user} /> */}
			<Header/>
			<Router>
				<Posts posts={posts} path="/" />
				<SinglePost path="/posts/:post_id" posts={posts} />
			</Router>
		</div>
	);
}

export default App;

  
var posts = [
	{
		postId: 1,
		url: "https://cdn0.rubylane.com/shops/kirstenscorner/678-GoudaRegina.0L.jpg?64",
		desc: "nice pot",
	},
	{
		postId: 2,
		url: "https://64.media.tumblr.com/6ba2bd60552224278da933856cb88ffb/tumblr_n5vguupiib1qftioao5_r1_1280.jpg",
		desc: "fancy bowl",
	},
	{
		postId: 3,
		url: "https://cfileonline.org/wp-content/uploads/2018/02/00-toru-kurawaku-contemporary-ceramic-art-exhibition.jpg",
		desc: "cool sculpture",
	},
	{
		postId: 4,
		url: "https://cfileonline.org/wp-content/uploads/2015/09/9b-coper-fivecycladicforms-contemporary-ceramic-art-cfile.jpg",
		desc: "hans coper",
	},
	{
		postId: 5,
		url: "https://worcesterart.org/exhibitions/archaic-avant-garde/images/E.31.18.8.jpg",
		desc: "contemporary ancient",
	},
];
