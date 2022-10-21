/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */

import HeadShare from '@/components/Head';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import React from 'react';
import classes from './style.module.less';






const propTypes = {
	// token: PropTypes.string.isRequired,
};

const defaultProps = {
	// token: '',
};

const ChangePassword = (props) => {
	// const { token } = props;

	// const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);

	// useAsync(async () => {
	// 	if (!AuthStorage.loggedIn) {
	// 		Router.push('/login');
	// 	}
	// }, []);

	// const onFinish = async (values) => {
	// 	try {
	// 		setLoading(true);
	// 		await dispatch(await actionChangePassword({
	// 			...values,
	// 		}));

	// 		message.success('Change password successfully');

	// 		Router.push('/');
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	return (
		<div
			className={classes.wrapper}
		>
			<HeadShare title='Change Password' />

			<div className={classes.left}>
				<div className={classes.leftOverlay} />
				<div className={classes.leftContent}>
					<div
						className="d-flex justify-content-center align-content-center flex-1 flex-column"
					>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
							onFinish={null}
							style={{
								width: 350,
								padding: '40px 20px',
								margin: '0 auto 40px',
								borderRadius: 4,
								background: '#fff',
							}}
							size="large"
						>
							<div className="text-center mb-5">
								<Image
									src="/images/logo.png"
									alt="Logo"
									width={150}
									height={150}
								/>
							</div>
							<Form.Item
								name="oldPassword"
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Please input your new password!',
									},
									{
										min: 6,
										message: 'Password must be at least 6 characters!',
									},
								]}
							>
								<Input.Password
									prefix={<LockOutlined className="site-form-item-icon" />}
									placeholder="Old Password"
								/>
							</Form.Item>
							<Form.Item
								name="newPassword"
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Please input your new password!',
									},
									{
										min: 6,
										message: 'Password must be at least 6 characters!',
									},
								]}
							>
								<Input.Password
									prefix={<LockOutlined className="site-form-item-icon" />}
									placeholder="New Password"
								/>
							</Form.Item>
							<Form.Item
								name="confirmPassword"
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Please input your confirm password!',
									},
									{
										min: 6,
										message: 'Confirm password must be at least 6 characters!',
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (!value || getFieldValue('newPassword') === value) {
												return Promise.resolve();
											}

											// eslint-disable-next-line prefer-promise-reject-errors
											return Promise.reject('The two passwords that you entered do not match!');
										},
									}),
								]}
							>
								<Input.Password
									prefix={<LockOutlined className="site-form-item-icon" />}
									placeholder="Confirm Password"
								/>
							</Form.Item>

							<Button type="primary" block htmlType="submit" className="login-form-button" loading={loading}>
								Change Password
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

ChangePassword.propTypes = propTypes;

ChangePassword.defaultProps = defaultProps;

export default ChangePassword;
