import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { SiteInfoCtx } from "../../lib/UI/SiteInfo";

export default function Navi() {
	const [site] = useContext(SiteInfoCtx);

	return (
		<nav className="ui inverted blue menu">
			<div className="ui container">
				<NavLink className="header item" to="/">
					{site.title}
				</NavLink>

				<div className="right menu">
					<div className="item">
						<Link to="/signin" className="ui blue button">
							登录
						</Link>
					</div>
					<div className="item">
						<Link to="/signup" className="ui blue button">
							注册
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
