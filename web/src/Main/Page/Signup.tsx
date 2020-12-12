/**
 * 注册页面
 */
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme: Theme) => ({
	root: {
		marginTop: theme.spacing(2)
	},
	text: {
		textAlign: "center"
	},
	right: {
		textAlign: "right"
	}
}));

export default function Signup() {
	const klass = useStyle();

	return (
		<Container maxWidth="sm" className={klass.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} className={klass.text}>
					<Typography variant="h5">注册新用户</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="账号"
						variant="outlined"
						size="small"
						autoFocus
						placeholder="登录用途的账号。"
						required
						fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="电子邮箱"
						variant="outlined"
						size="small"
						placeholder="预留电子邮箱，仅仅作为找回密码的凭证。。"
						required
						fullWidth />
				</Grid>
				<Grid item xs={6}>
					<TextField
						label="密码"
						variant="outlined"
						placeholder="登录使用的密码。"
						type="password"
						required
						size="small"
						fullWidth />
				</Grid>
				<Grid item xs={6}>
					<TextField
						label="确认密码"
						variant="outlined"
						placeholder="确认要使用的密码，防止手误使用错误密码。"
						size="small"
						type="password"
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="用户名"
						variant="outlined"
						placeholder="网站上显示的用户名，与账号不相同。"
						size="small"
						fullWidth
					/>
				</Grid>

				<Grid item xs={12}>
					<Button variant="contained" color="primary" fullWidth>注册</Button>
				</Grid>

				<Grid item xs={12} className={klass.right}>
					已有账号？
					<Link component={RouterLink} to="/signin">
						马上登录！
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}
