/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import Logo from '@/components/Layout/Logo';
import classes from './style.module.less';


const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const Login = (props) => {
	// const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);

	// React.useEffect(() => {
	// 	if (AuthStorage.loggedIn) {
	// 		Router.push('/');
	// 	}
	// }, []);

	const onFinish = async (values) => {
		try {
			setLoading(true);
			// await dispatch(await actionLogin({
			// 	...values,
			// }));
			Router.push('/home');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={classes.wrapper}
		>
			<div className={classes.left}>
				<div className={classes.leftOverlay} />
				<div className={classes.leftContent}>
					<Logo />
					<div className="ml-4 flex-1">
						<h1 className="pt-0 text-white">CB-TEAM</h1>
						<p className="">Event Management</p>
					</div>
				</div>
			</div>
			<div className={classes.right}>
				<div
					className="d-flex justify-content-center align-content-center flex-1 flex-column"
				>
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						style={{
							width: 350,
							padding: 20,
							margin: '0 auto 40px',
							borderRadius: 4,
							background: '#fff',
						}}
						size="large"
					>
						<div className="text-center mb-5">
							<Logo
								width={150}
								height={150}
							/>
						</div>
						<Form.Item
							name="username"
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your Password!',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item>
							<div className="text-center">
								<Link href="/auth/forgot-password">
									<a className="login-form-forgot">
										Forgot password
									</a>
								</Link>
							</div>
						</Form.Item>

						<Button type="primary" block htmlType="submit" className="login-form-button" loading={loading}>
							Login
						</Button>

						<div className="mt-5">
							<div className="class">
								Email: admin@gmail.com
							</div>
							<div className="class">
								Password: admin123
							</div>
						</div>
					</Form>
				</div>
				<div className="py-2">
					<strong className="text-primary">CB-Team</strong>
					<span> 2022 © All Rights Reserved.</span>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = propTypes;

Login.defaultProps = defaultProps;

export default Login;
