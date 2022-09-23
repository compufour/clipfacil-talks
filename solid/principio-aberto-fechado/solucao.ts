interface Remuneracao {
  calculaRemuneracao(): number;
}

export class Clt implements Remuneracao {
  private readonly mes: number | undefined;

  public calculaRemuneracao() {
    if (this.mes === 10) {
      const decimo = 600;
      return 1200 + decimo;
    }
    return 1200;
  }
}

export class Estagiario implements Remuneracao {
  constructor(private readonly bonus: number | undefined) {}

  public calculaRemuneracao() {
    if (this.bonus) {
      return 300 + this.bonus;
    }
    return 300;
  }
}

export class FolhaPagamento {
  public calcula(funcionario: Remuneracao) {
    return funcionario.calculaRemuneracao();
  }
}

console.log(new FolhaPagamento().calcula(new Clt()));
