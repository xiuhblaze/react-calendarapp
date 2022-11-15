import { useAuthStore } from "../../hooks"

export const Navbar = () => {

    const { user, startLogout } = useAuthStore();

    const onLogout = () => {
        startLogout();
    };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container">
        <span className="navbar-brand">
          <i className="fas fa-calendar-alt me-2"></i>
          Calendar App - { user.name }
        </span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li> */}
          </ul>
          <button className="d-flex btn btn-outline-danger" onClick={ onLogout }>
            <i className="fas fa-sign-out-alt me-2 pt-1"></i>
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
