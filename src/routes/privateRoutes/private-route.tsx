import React, { ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import { toast } from '@ravenpay/raven-bank-ui';

export const LOGOUT = async () => {
	localStorage.clear();
	// setCookie('token', '', 0);
};

const PrivateRouteDashboard = ({ children }: any) => {
	// let isLoggingOut = false; // global


	const authenticated = localStorage.getItem('token');

	return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRouteDashboard;