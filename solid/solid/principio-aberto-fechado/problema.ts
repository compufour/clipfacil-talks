class Clt {
  constructor(private readonly mes: number) {}

  public salario() {
    if (this.mes === 10) {
      const decimo = 600;
      return 1200 + decimo;
    }
    return 1200;
  }
}

class Estagiario {
  constructor(private readonly bonus: number) {}

  public auxilio() {
    if (this.bonus) {
      return 300 + this.bonus;
    }
    return 300;
  }
}

class JovemAprendiz {
  constructor(private readonly bonus: number) {}

  public auxilio() {
    if (this.bonus) {
      return 300 + this.bonus;
    }
    return 300;
  }
}

class FolhaPagamento {
  public calcula(funcionario: Clt | Estagiario) {
    if (funcionario instanceof Clt) {
      return funcionario.salario();
    }

    if (funcionario instanceof Estagiario) {
      return funcionario.auxilio();
    }

    if (funcionario instanceof JovemAprendiz) {
      return funcionario.auxilio();
    }
  }
}

console.log(new FolhaPagamento().calcula(new Estagiario(10)));
