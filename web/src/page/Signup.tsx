/**
 * 注册页面
 */
import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default function Signup() {
	return (
		<Paper elevation={3}>
			<Typography variant="h3">注册新用户</Typography>
			<Divider />

			<Grid>
				<Grid item>
					<h1>hello world</h1>
				</Grid>
			</Grid>
		</Paper>
	);
}
