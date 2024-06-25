import { createContext, useState } from "react";

//usamos a função do createContext que retorna um objeto de contexto
export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

//Esse objeto de contexto é então usado para criar um componente Provider, que compartilha o contexto com os componentes filhos.
export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  return (
    //O Provider é responsável por envolver os componentes que precisam acessar os dados do contexto.
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidade,
        setQuantidade,
        valorTotal,
        setValorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
