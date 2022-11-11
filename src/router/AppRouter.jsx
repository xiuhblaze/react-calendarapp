import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
  //const authStatus = 'not-authenticated'; // not-authenticated, authenticated
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();    
  }, [])
  
  if (status === 'checking') {
    return (
        <div className="m-0 vh-100 row justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated') 
          ? 
            <>
                <Route path="/auth/*" element={ <LoginPage /> } />
                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            </>
          : 
            <>
                <Route path="/" element={ <CalendarPage /> } />
                <Route path="/*" element={ <Navigate to="/" /> } />
            </>
      }
    </Routes>
  )
}
