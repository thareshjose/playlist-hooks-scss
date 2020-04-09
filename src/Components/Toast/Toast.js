import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.scss';

export const notifySuccess = () => {
	toast.success('Added to playlist', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});
};

export const notifyError = () => {
	toast.error('Error adding to playlist!', {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});
};

const Toast = () => {
	return (
		<ToastContainer
			position={'top-right'}
			autoClose={3000}
			hideProgressBar
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnVisibilityChange
			draggable
			pauseOnHover
		/>
	);
};

export default Toast;
