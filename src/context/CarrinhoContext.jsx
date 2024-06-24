import { createContext } from "react";

//usamos a função do createContext que retorna um objeto de contexto
export const CarrinhoContext = createContext();

//Esse objeto de contexto é então usado para criar um componente Provider, que compartilha o contexto com os componentes filhos.
export const CarrinhoProvider = ({children}) => {
    return (
        //O Provider é responsável por envolver os componentes que precisam acessar os dados do contexto.
        <CarrinhoContext.Provider>
            {children}
        </CarrinhoContext.Provider>
    )
}