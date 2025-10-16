import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkAuthStatus } from '../store/actions';

const PrivateRoute = ({ publicPage = false, adminOnly = false, sellerOnly = false }) => {
    const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    // Check authentication status on mount
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            dispatch(checkAuthStatus());
        }
    }, [dispatch, isAuthenticated, isLoading]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const isAdmin = user && user?.roles?.some(role => role.roleName === "ROLE_ADMIN");
    const isSeller = user && user?.roles?.some(role => role.roleName === "ROLE_SELLER");
    const isUser = user && user?.roles?.some(role => role.roleName === "ROLE_USER");

    // Public pages (login, register) - redirect if already authenticated
    if (publicPage) {
        return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
    }

    // Admin only pages
    if (adminOnly) {
        if (!isAuthenticated) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        
        if (!isAdmin) {
            if (isSeller) {
                // Allow sellers to access certain admin pages
                const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
                const sellerAllowed = sellerAllowedPaths.some(path => 
                    location.pathname.startsWith(path)
                );
                if (!sellerAllowed) {
                    return <Navigate to="/" replace />;
                }
            } else {
                return <Navigate to="/" replace />;
            }
        }
    }

    // Seller only pages
    if (sellerOnly) {
        if (!isAuthenticated) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        
        if (!isSeller && !isAdmin) {
            return <Navigate to="/" replace />;
        }
    }

    // Regular protected routes - require authentication
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return <Outlet />;
}

export default PrivateRoute;