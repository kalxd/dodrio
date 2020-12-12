import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme: Theme) => ({
	root: {
		marginTop: theme.spacing(2)
	},
	right: {
		textAlign: "right"
	}
}));

export default function Signin() {
	const klass = useStyle();

	return (
		<Container maxWidth="sm" className={klass.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} className={klass.root}>
					  <Typography variant="h5">登录</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="账号"
						variant="outlined"
						size="small"
						autoFocus
						placeholder="登录账号"
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="密码"
						variant="outlined"
						size="small"
						placeholder="你知我知的登录密码"
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<Button color="primary" variant="contained" fullWidth>登录</Button>
				</Grid>
				<Grid item xs={6}>
					密记密码？重新设置。
				</Grid>
				<Grid item xs={6} className={klass.right}>
					还没有帐号？
					<Link to="/signup" component={RouterLink}>
						马上注册！
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}
