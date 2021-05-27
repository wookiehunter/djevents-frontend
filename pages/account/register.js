import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import AuthContext from '@/context/AuthContext';

export default function registerPage() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { register, error } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		register({ username, email, password });
	};

	return (
		<Layout title='User Registration'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							value={username}
							id='username'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							value={email}
							id='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							value={password}
							id='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<input
							type='password'
							value={confirmPassword}
							id='confirmPassword'
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<input type='submit' value='Login' className='btn' />
				</form>
				<p>
					Already have an account? <Link href='/account/login'>Login</Link>
				</p>
			</div>
		</Layout>
	);
}
