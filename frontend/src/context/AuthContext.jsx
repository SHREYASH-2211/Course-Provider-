import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('courseUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role = 'student') => {
    // Dummy authentication logic
    const dummyUsers = {
      'admin@course.com': { id: 1, email: 'admin@course.com', role: 'admin', name: 'Admin User' },
      'host@course.com': { id: 2, email: 'host@course.com', role: 'host', name: 'Event Host' },
      'student@course.com': { id: 3, email: 'student@course.com', role: 'student', name: 'Student User' }
    };

    const userData = dummyUsers[email];
    if (userData && password === 'password') {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('courseUser', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (name, email, password, role = 'student') => {
    // Dummy registration logic
    const userData = {
      id: Date.now(),
      name,
      email,
      role,
      approved: role === 'student' ? true : false // Students auto-approved, hosts need approval
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('courseUser', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('courseUser');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};