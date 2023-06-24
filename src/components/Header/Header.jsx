import React from "react";

import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { ReactComponent as Sino } from '../../assets/img/icone-bell.svg';
import { ReactComponent as User } from '../../assets/img/usuario.svg';

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-info">
        <div className="header-info-global">
          <Logo />
          <div>
            <p>Surreal São Paulo</p>
            <span>VTEX</span>
          </div>
        </div>

        <Sino className='sino' />
      </div>
        <span className=" line-header"></span>

      <div className="header-profile">
        <p>Olá, Fulano</p>
        <User />
      </div>
    </div>
  );
};

export default Header;
