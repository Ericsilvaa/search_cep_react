import React from "react";

import { ReactComponent as Place } from "../../assets/img/icone-lugar.svg";
import { ReactComponent as Lixo } from "../../assets/img/icone-lixo.svg";
import { toast } from "react-toastify";

const CardCep = ({ cep, setDataCepRequest, setCepUpdate }) => {
  function handleDeleteCep(cep) {
    const cepStorage = JSON.parse(localStorage.getItem("cep_db_string"));
    const cepStorageJson = JSON.parse(localStorage.getItem("cep_db_json"));

    const newArrayCep = cepStorage?.filter((cepDelete) => cepDelete !== cep);
    const newArrayCepJson = cepStorageJson?.filter(
      (cepDelete) => cepDelete.cep !== cep
    );

    localStorage.setItem("cep_db_string", JSON.stringify(newArrayCep));
    localStorage.setItem("cep_db_json", JSON.stringify(newArrayCepJson));
    setCepUpdate((valor) => !valor);
    toast.error('Item Excluido')
    // setDataCepRequest(newArrayCep)
  }

  return (
    <div className="cep-req">
      <span className="line-row"></span>
      <ul>
        {cep?.length ? (
          cep.map(({ cep, logradouro, bairro, localidade, uf }) => (
            <li key={cep}>
              <div>
                <Place className="place" />
                <div className="info-cidade">
                  <p>
                    {logradouro}, {bairro}
                  </p>
                  <span>
                    {localidade} - {uf}
                  </span>
                </div>
              </div>
              <div className="cep-lixo">
                <span className="cep">{cep}</span>
                <span className="line"></span>
                <button
                  className="btn_excluir"
                  onClick={() => handleDeleteCep(cep)}
                >
                  <Lixo />
                </button>
              </div>
            </li>
          ))
        ) : (
          <span className="cep-empty">NÃO HÁ CEP GERADO</span>
        )}
      </ul>
    </div>
  );
};

export default CardCep;
