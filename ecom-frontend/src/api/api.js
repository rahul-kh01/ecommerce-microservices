import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token to requests
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const authData = localStorage.getItem("auth");
        if (authData) {
            try {
                const parsedAuth = JSON.parse(authData);
                if (parsedAuth && parsedAuth.token) {
                    config.headers.Authorization = `Bearer ${parsedAuth.token}`;
                }
            } catch (error) {
                console.error("Error parsing auth data:", error);
                localStorage.removeItem("auth");
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration and errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Try to refresh token
            try {
                const refreshResponse = await api.post("/auth/refresh");
                if (refreshResponse.data && refreshResponse.data.jwtToken) {
                    // Update stored token
                    const authData = {
                        ...refreshResponse.data,
                        token: refreshResponse.data.jwtToken,
                        isAuthenticated: true
                    };
                    localStorage.setItem("auth", JSON.stringify(authData));
                    
                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.jwtToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.log("Token refresh failed:", refreshError);
            }
            
            // If refresh fails, redirect to login
            localStorage.removeItem("auth");
            toast.error("Session expired. Please login again.");
            window.location.href = "/login";
        } else if (error.response?.status === 403) {
            // Access denied
            toast.error("Access denied. You don't have permission to perform this action.");
        } else if (error.response?.status >= 500) {
            // Server error
            toast.error("Server error. Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default api;