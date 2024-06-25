import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

//hook customizado para adicionar a remover produtos
export const useCarrinhoContext = () => {
  //criamos uma variável com chaves pra indicar que vamos desestruturar algo, nesse caso o hook useContext, que iremos usar somente o carrinho e o setCarrinho
  const {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal,
  } = useContext(CarrinhoContext);

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }

  function adicionarProduto(novoProduto) {
    //verifica se tem o produto e percorre o carrinho com a função some do javascript pra verificar se tem algum elemento dentro do carrinho que retorna true ou false
    const temOProduto = carrinho.some(
      (itemDoCarrinho) =>
        //pra cada item do carrinho, verifica se o id é o mesmo do produto a adicionar
        itemDoCarrinho.id === novoProduto.id
    );
    //se não tiver o produto, adiciona no carrinho
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      //usa o carrinho anterior como o estado e adiciona o novo produto nesse estado
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProduto(id) {
    //tenta encontrar o produto
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    //verifica se é o ultimo
    const ultimo = produto.quantidade === 1;
    //se for o ultimo, atualiza o estado do carrinho
    if (ultimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }
    const carrinhoAtualizado = mudarQuantidade(id, -1);
    //se não for o ultimo, remove um item
    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProdutoCarrinho(id) {
    //recebe o id do produto a ser removido e retorna uma lista de produtos que são diferentes do produto que será removido, então atualiza o estado do carrinho sem aquele produto
    const produto = carrinho.filter(
      (itemDoCarrinho) => itemDoCarrinho.id !== id
    );
    setCarrinho(produto);
  }
  const { totalTemp, quantidadeTemp } = useMemo(() => {
    return carrinho.reduce(
      (acumulador, produto) => ({
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
        totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
      }), 
      {
        quantidadeTemp: 0,
        totalTemp: 0,
      }
    );
  }, [carrinho]);
    
  //usa o hook useEffect pra monitorar o carrinho e exibir a quantidade e preço atualizado de acordo com os produtos no carrinho
  useEffect(() => {
    setQuantidade(quantidadeTemp);
    setValorTotal(totalTemp);
  });

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    valorTotal,
    quantidade,
  };
};
