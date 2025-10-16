const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    address: [],
    clientSecret: null,
    selectedUserCheckoutAddress: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { 
                ...state, 
                user: action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case "USER_ADDRESS":
            return { ...state, address: action.payload };
        case "SELECT_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: action.payload };
        case "REMOVE_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: null };
        case "CLIENT_SECRET":
            return { ...state, clientSecret: action.payload };
        case "REMOVE_CLIENT_SECRET_ADDRESS":
            return { ...state, clientSecret: null, selectedUserCheckoutAddress: null };
        case "AUTH_LOADING":
            return { ...state, isLoading: true };
        case "AUTH_SUCCESS":
            return { ...state, isLoading: false };
        case "AUTH_ERROR":
            return { ...state, isLoading: false };
        case "LOG_OUT":
            return { 
                user: null,
                isAuthenticated: false,
                isLoading: false,
                address: null,
                clientSecret: null,
                selectedUserCheckoutAddress: null
            };
             
        default:
            return state;
    }
};