import React, { useEffect, useState } from "react";

import SideBar from "../components/SideBar/SideBar";

import { ReactComponent as Plus } from "../assets/img/icone-plus.svg";

import "./Home.css";
import CardCep from "../components/CardCep/CardCep";
import CepSelected from "../components/CepSelected/CepSelected";
import { toast } from "react-toastify";

const Home = () => {
  const [dataCep, setDataCep] = useState();
  const [dataCepRequest, setDataCepRequest] = useState();
  const [cepItem, setCepItem] = useState("");
  const [cepUpdate, setCepUpdate] = useState(true);

  useEffect(() => {
    const cepStorage = JSON.parse(localStorage.getItem("cep_db_string"));
    const cepStorageJson = JSON.parse(localStorage.getItem("cep_db_json"));

    setDataCep(cepStorage);
    setDataCepRequest(cepStorageJson);
  }, [cepUpdate]);

  function handleSubmit(e) {
    e.preventDefault();

    const cepStorage = JSON.parse(localStorage.getItem("cep_db_string"));

    if (!cepItem) {
      toast.warn("Preencha o campo corretamente!");
      setCepItem("");
      return;
    }

    let hasCep = cepStorage?.filter((cep) => cep === cepItem);

    if (hasCep?.length) {
      toast.error("Este Cep Já está Listado");
      setCepItem("");
      return;
    }

    let newCep;
    if (cepStorage) {
      newCep = [...cepStorage, cepItem];
      //
    } else {
      newCep = [cepItem];
    }

    localStorage.setItem("cep_db_string", JSON.stringify(newCep));
    setDataCep(newCep);
    setCepItem("");
    setCepUpdate((valor) => !valor);
    toast.success("Item Adicionado");
    return;
  }

  async function handleGetCep() {
    const requests = dataCep.map(async (cep) => {
      return await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    });

    try {
      const res = await Promise.allSettled(requests);
      let response = res.map(async (cep) => {
        // tratando carro de erro
        const result = cep.value;
        return await result.json();
      });

      const promiseAll = await toast.promise( Promise.all(response).then((item) => {
        setDataCepRequest(item);
        localStorage.setItem("cep_db_json", JSON.stringify(item));
      }),{
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯'
      })

    } catch (error) {
      console.log(error);
    }

    // let newList = [];
    // try {
    //   const cepRequest = dataCep.forEach(async (cep) => {
    //     const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    //     const json = await response.json();
    //     if (json.erro) {
    //       throw new Error();
    //     }
    //     newList.push(json);
    //     console.log(newList);
    //   });
    // } catch (er) {
    //   alert("catch", er);
    // }
  }

  return (
    <div className="mainContainer">

      <SideBar />
      <div className="content">
        <div className="container">
          {/* COMPONENTIZAR */}
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Insira o CEP"
              value={cepItem}
              onChange={({ target }) => setCepItem(target.value)}
            />
            <button className="btn_default" type="submit">
              <Plus />
              <p>Adicionar endereço</p>
            </button>
          </form>

          {/* COMPONENTIZAR */}
          <CepSelected dataCep={dataCep} />

          <div className="button-gerar-enderecos ">
            <button className="btn_default" onClick={handleGetCep}>
              <p>Gerar endereços</p>
            </button>
          </div>

          {/* COMPONENTIZAR */}
          <CardCep
            cep={dataCepRequest}
            setCepUpdate={setCepUpdate}
            setDataCepRequest={setDataCepRequest}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
