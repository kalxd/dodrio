import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((_: Theme) => ({
	grow: {
		flexGrow: 1
	}
}));

export default function Nav() {
	const klass = useStyle();

	return (
		<AppBar position="static" color="primary">
			<ToolBar>
				<Typography>hello world</Typography>

				<div className={klass.grow} />

				<Button color="inherit" component={RouterLink} to="/signup">注册</Button>
				<Button color="inherit" component={RouterLink} to="/signin">登录</Button>
			</ToolBar>
		</AppBar>
	);
}
