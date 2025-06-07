export interface Odontograma {
    superiorEsquerdo: string[];
    superiorDireito: string[];
    inferiorEsquerdo: string[];
    inferiorDireito: string[];
  }
  
  export interface Vitima {
    cin: string;
    nome: string;
    genero?: string;
    idade?: string;
    documento?: string;
    endereco?: string;
    cor?: string;
    odontograma: Odontograma;
    anotacoesOdontograma?: string;
  }
  