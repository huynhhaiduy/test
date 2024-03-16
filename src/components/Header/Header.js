import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { FaReact } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    let rs = await logout(account.email, account.refresh_token);
    if (rs && rs.EC === 0) {
      // clear data redux
      dispatch(doLogout());

      navigate("/login");
    } else {
      toast.error(rs.EM);
    }
  };

  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">Huỳnh Hải Duy</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">
          <FaReact className="brand-icon" />
          &nbsp;{t("header.brand")}
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("header.user")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {t("header.admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  {t("header.login")}
                </button>
                <button className="btn-signup" onClick={() => handleRegister()}>
                  {t("header.signup")}
                </button>
              </>
            ) : (
              <NavDropdown title={t("header.setting")} id="basic-nav-dropdown">
                <NavDropdown.Item>{t("header.profile")}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  {t("header.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
