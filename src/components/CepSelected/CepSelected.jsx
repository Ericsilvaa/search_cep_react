import React from "react";

import { ReactComponent as Place } from "../../assets/img/icone-lugar.svg"


const CepSelected = ({dataCep}) => {


  return (
    <ul className="cep-selected">
      {dataCep?.length ? (
        dataCep.map((cep) => (
          <li key={cep}>
            <Place />
            <p>CEP</p>
            <span>{cep}</span>
          </li>
        ))
      ) : (
        <span className="cep-empty">NÃO HÁ CEP ADICIONADO</span>
      )}
    </ul>
  );
};

export default CepSelected;
