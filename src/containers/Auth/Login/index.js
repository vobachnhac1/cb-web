/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import React ,{ useEffect, memo} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import Logo from '@/components/Layout/Logo';
import classes from './style.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getters } from '@/redux/global'
import { actions as actionsSys  } from '@/redux/system'
import { useRouter } from 'next/router';
import HeadShare from '@/components/Head';
import { PathTitle } from '@/constants/url-name'
const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const Login = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);
	const isAuth=  useSelector(getters.getAccessToken)

	useEffect(() => {
		if (isAuth) {
			initLoadData();
			router.push('/home');
		}
	}, [isAuth]);
	const initLoadData = async()=>{
    await dispatch(actionsSys.setSystemList());
	} 
	const onsubmitLogin = async (values) => {
		try {
			setLoading(true);
			const result = await dispatch(actions.loginAdmin(values));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={classes.wrapper}
		>
			<HeadShare title={PathTitle[`${router.pathname}`]} />
			<div className={classes.left}>
				<div className={classes.leftOverlay} />
				<div className={classes.leftContent}>
					<Logo />
					<div className="ml-4 flex-1">
						<h1 className="pt-0 text-white">Digital CBBank</h1>
						<p className="">Management</p>
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
						onFinish={onsubmitLogin}
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
					</Form>
				</div>
				<div className="py-2">
					<strong className="text-primary">Digital CBBank</strong>
					<span> 2022 © All Rights Reserved.</span>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = propTypes;

Login.defaultProps = defaultProps;

export default  memo(Login);
