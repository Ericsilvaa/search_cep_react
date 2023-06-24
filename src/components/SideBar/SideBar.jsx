import React from "react";

import { ReactComponent as Ajuste } from "../../assets/img/icone-ajuste.svg";
import { ReactComponent as Busca } from "../../assets/img/icone-busca.svg";
import { ReactComponent as Pasta } from "../../assets/img/icone-folder2.svg";

import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <Busca />
        <Pasta />
      </div>

      <div className='ajuste'>
        <Ajuste />
      </div>
    </div>
  );
};

export default SideBar;
