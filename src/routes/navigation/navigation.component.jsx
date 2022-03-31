import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {UserContext} from "../../contexts/user.context";
import {CartContext} from "../../contexts/cart.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const {currentUser, /*setCurrentUser*/} = useContext(UserContext);
  const {toggleCart} = useContext(CartContext);
  //console.log(currentUser);

  /*const signOutHandler = async () => {
      await signOutUser();
      setCurrentUser(null);
  };*/

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) :
            (<Link className='nav-link' to='/auth'>SIGN-IN</Link>)
          }
          <CartIcon />
        </div>
        {
          toggleCart && <CartDropdown />
        }

      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
