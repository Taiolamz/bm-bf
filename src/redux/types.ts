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

export interface BillingState {
	loading: boolean;
	billing?: {
		billing: {} | any
	};
	// logging_out?: boolean;
    // response: any;
}


export interface SubscriptionState {
	loading: boolean;
	subscriptions?: {
		subscriptions: {} | any
	};
	// logging_out?: boolean;
    // response: any;  
}



type RootState = {
	auth: AuthState;
    billing: BillingState;
	subscriptions:  SubscriptionState,
	// Add other reducer states here if you have more reducers
};

export default RootState;