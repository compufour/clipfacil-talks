type VendaData = {
  totalPago: number;
  cliente: ClienteData;
  produtos: ProdutoData[];
  pagamento: PagamentoData;
};

type ProdutoData = {
  descricao: string;
  valor: number;
  id?: number;
  quantidade: number;
};

type PagamentoData = {
  parcelas: number;
  valorPago: number;
};

type ClienteData = {
  cpf?: number;
  nome: string;
};

export class Venda {
  salvaVenda(venda: VendaData) {
    this.salvaProdutoBancoDeDados(venda);
    this.validaTotalPago(venda);
    this.validaCpfCliente(venda);
    this.salvaNoBancoDeDados(venda);
  }

  salvaProdutoBancoDeDados(venda: VendaData) {
    venda.produtos.forEach((produto) => {
      if (!bancoDeDados.produtos.find((bd) => produto.id)) {
        bancoDeDados.produtos.push({
          ...produto,
          id: bancoDeDados.produtos.length + 1,
        });
      }
    });
  }

  salvaNoBancoDeDados(venda: VendaData) {
    bancoDeDados.vendas.push(venda);
  }

  validaCpfCliente(venda: VendaData) {
    if (!venda.cliente.cpf) {
      throw new Error("Informe o cpf do cliente");
    }
  }

  validaTotalPago(venda: VendaData) {
    const totalProduto = venda.produtos.reduce(
      (total, item) => total + item.valor,
      0
    );

    if (totalProduto < venda.pagamento.valorPago) {
      throw new Error("Total dos produtos é menor que o valor pago");
    }
  }
}

let bancoDeDados = {
  produtos: [
    {
      id: 1,
      descricao: "coca-cola 2l",
      valor: 10,
      quantidade: 4,
    },
  ],
  vendas: [] as VendaData[],
};

const vendaRealizada = {
  produtos: [
    {
      id: 1,
      descricao: "coca-cola 2l",
      valor: 10,
      quantidade: 4,
    },
    {
      id: 2,
      descricao: "sprite 2l",
      valor: 8,
      quantidade: 2,
    },
  ],
  cliente: {
    cpf: 123456789,
    nome: "Fulano",
  },
  totalPago: 18,
  pagamento: {
    parcelas: 1,
    valorPago: 18,
  },
};
console.log(bancoDeDados);

const venda = new Venda();

venda.salvaVenda(vendaRealizada);

console.log(bancoDeDados);
