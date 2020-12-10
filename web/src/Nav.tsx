import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Nav() {
	return (
		<AppBar position="static">
			<ToolBar>
				<Typography>hello world</Typography>
			</ToolBar>
		</AppBar>
	);
}
