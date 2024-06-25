import { createContext, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

//usamos a função do createContext que retorna um objeto de contexto
export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];

//Esse objeto de contexto é então usado para criar um componente Provider, que compartilha o contexto com os componentes filhos.
export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  return (
    //O Provider é responsável por envolver os componentes que precisam acessar os dados do contexto.
    <CarrinhoContext.Provider
      value={{
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
