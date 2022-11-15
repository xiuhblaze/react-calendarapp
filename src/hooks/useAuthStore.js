import { useDispatch, useSelector } from "react-redux";

import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onRegister } from "../store/authSlice/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);    
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch(onChecking)
        // console.log({ email, password });

        try {
            const { data } = await calendarApi.post('/auth', { email, password })
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
          console.log(error);
            dispatch(onLogout('Usuario y/o contraseña no validos.'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const startRegister = async({ name, email, password }) => {
        dispatch(onRegister());

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password })

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            // console.log(resp);

        } catch (error) {
            console.log(error);
            dispatch(onLogout(error.response.data.msg || 'Ha ocurrido una excepción.'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

        //console.log({ name, email, password });
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('auth/renew');
            // console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            // El token ya expiró
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    };

    return {
        // properties
        status,
        user,
        errorMessage,

        // methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    };
}