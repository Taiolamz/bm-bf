export interface AuthState {
	loading: boolean;
	isAuth: boolean;
	token?: string;
	user?: {
		fname: string;
		lname: string;
		email: string;
	};
	logging_out?: boolean;
    // response: any;
}


type RootState = {
	auth: AuthState;

	// Add other reducer states here if you have more reducers
};

export default RootState;