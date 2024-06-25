import React, { useContext } from "react";
import Produto from "./Produto";
import produtos from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const Produtos = () => {
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
  return (
    <section role="produtos" aria-label="Produtos que estão bombando!">
      <Titulo>Produtos que estão bombando!</Titulo>
      <div className="container row mx-auto">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            {...produto}
            adicionarProduto={adicionarProduto}
          />
        ))}
      </div>
    </section>
  );
};

export default Produtos;
