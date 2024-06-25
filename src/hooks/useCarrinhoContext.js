import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

//hook customizado para adicionar a remover produtos
export const useCarrinhoContext = () => {
  //criamos uma variável com chaves pra indicar que vamos desestruturar algo, nesse caso o hook useContext, que iremos usar somente o carrinho e o setCarrinho
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    //verifica se tem o produto e percorre o carrinho com a função some do javascript pra verificar se tem algum elemento dentro do carrinho que retorna true ou false
    const temOProduto = carrinho.some((itemDoCarrinho) => {
      //pra cada item do carrinho, verifica se o id é o mesmo do produto a adicionar
      itemDoCarrinho.id === novoProduto.id;
    });
    //se não tiver o produto, adiciona no carrinho
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      //usa o carrinho anterior como o estado e adiciona o novo produto nesse estado
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    //se o produto já estiver no carrinho, aumenta a quantidade dele
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === novoProduto.id)
          itemDoCarrinho.quantidade += 1;
        return itemDoCarrinho;
      })
    );
  }

  function removerProduto(id) {
    //tenta encontrar o produto
    const produto = carrinho.find((itemDoCarrinho) => {
      itemDoCarrinho.id === id;
    });
    //verifica se é o ultimo
    const ultimo = produto.quantidade === 1;
    //se for o ultimo, atualiza o estado do carrinho
    if (ultimo) {
      return setCarrinho((carrinhoAnterior) => 
      carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id))
    }
    //se não for o ultimo, remove um item
    setCarrinho((carrinhoAnterior) =>
    carrinhoAnterior.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id)
        itemDoCarrinho.quantidade -= 1;
      return itemDoCarrinho;
    }));
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  };
};
