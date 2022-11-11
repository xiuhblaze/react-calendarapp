
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
};

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirm: ''
};

const registerFormValidations = {
  registerName: [(value) => value.length > 0, 'Es necesario indicar el nombre.'],
  registerEmail: [(value) => value.includes('@'), 'Formato de correo no valido.'],
  registerPassword: [(value) => value.length > 0, 'La contraseña no puede ser vacia.'],
};

export const LoginPage = () => {
    
    const { 
        loginEmail, 
        loginPassword, 
        onInputChange:onLoginInputChange 
    } = useForm(loginFormFields);

    const {
        registerName, 
        registerEmail,
        registerPassword, 
        registerPasswordConfirm,
        isFormValid,
        registerNameValid,
        registerEmailValid,
        registerPasswordValid,
        onInputChange:onRegisterInputChange
    } = useForm(registerFormFields, registerFormValidations);

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    useEffect(() => {
      if (!!errorMessage) {
        Swal.fire('Ingreso', errorMessage, 'error');
      }
    }, [ errorMessage ])

    // Local Functions

    const onLoginSubmit = (event) => {
        event.preventDefault();

        startLogin({ email: loginEmail, password: loginPassword });
    };

    const onRegisterSubmit = (event) => {
        event.preventDefault();

        // Validaciones
        if (registerPassword !== registerPasswordConfirm) {
            Swal.fire('Registro', 'La contraseña y su confirmación no coinciden', 'error');
            return;
        }

        if (!isFormValid) {
            let errMsg = '';
            console.log({ registerNameValid, registerEmailValid, registerPasswordValid });
            return;
        }

        startRegister({
            name: registerName,
            email: registerEmail,
            password: registerPassword
        });

        // console.log({
        //     registerName, 
        //     registerEmail,
        //     registerPassword, 
        //     registerPasswordConfirm
        // });
    };

  return (
    <div className="container login-container">
      <div className="row justify-content-between">
        <div className="col-md-5 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={ onLoginSubmit }>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={ loginEmail }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={ loginPassword }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit w-100"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-5 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={ onRegisterSubmit }>
            <div className="form-group mb-2">
              <input
                type="text"
                className={ !!registerNameValid ? "form-control is-invalid" : "form-control" }
                placeholder="Nombre"
                name="registerName"
                value={ registerName }
                onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className={ !!registerEmailValid ? "form-control is-invalid" : "form-control" }
                placeholder="Correo"
                name="registerEmail"
                value={ registerEmail }
                onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className={ !!registerPasswordValid ? "form-control is-invalid" : "form-control" }
                placeholder="Contraseña"
                name="registerPassword"
                value={ registerPassword }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPasswordConfirm"
                value={ registerPasswordConfirm }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit w-100"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}