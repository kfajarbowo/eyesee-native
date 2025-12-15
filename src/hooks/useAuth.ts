import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { userAtom, isAuthenticatedAtom, authTokenAtom, type User } from '@/store/auth.atom';
import { setClientToken, axiosClient } from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  access_token: string;
}

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    console.log('[useAuth] Initializing from localStorage...');
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');

    console.log('[useAuth] Stored token:', storedToken ? 'exists' : 'none');
    console.log('[useAuth] Stored user:', storedUser ? 'exists' : 'none');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('[useAuth] Restoring session for:', parsedUser.email);
        setUser(parsedUser);
        setAuthToken(storedToken);
        setIsAuthenticated(true);
        setClientToken(storedToken);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        // Clear invalid data inline (don't call logout to avoid dependency)
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
        setAuthToken(null);
        setIsAuthenticated(false);
      }
    } else {
      console.log('[useAuth] No stored session found');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      // Use electron login endpoint (bypasses all middleware)
      const response = await axiosClient.post<LoginResponse>('/electron/login/', credentials);
      
      console.log('[useAuth] Login response:', response.data);
      console.log('[useAuth] Token:', response.data.access_token);
      console.log('[useAuth] User:', response.data.user);
      
      const { user: userData, access_token } = response.data;

      // Store in state
      setUser(userData);
      setAuthToken(access_token);
      setIsAuthenticated(true);

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('auth_token', access_token);
      
      console.log('[useAuth] Saved to localStorage');
      console.log('[useAuth] Token length:', access_token.length);

      // Set token in axios
      setClientToken(access_token);
      
      console.log('[useAuth] Token set in axios client');

      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Login failed:', error);
      console.error('Error response:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  }, [setUser, setAuthToken, setIsAuthenticated]);

  const logout = useCallback(() => {
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    setClientToken(null);
    navigate('/login');
  }, [setUser, setAuthToken, setIsAuthenticated, navigate]);

  const hasPermission = useCallback((permissionCode: string): boolean => {
    if (!user) return false;
    return user.role.permissions_code.includes(permissionCode);
  }, [user]);

  return {
    user,
    isAuthenticated,
    authToken,
    login,
    logout,
    hasPermission,
  };
}
