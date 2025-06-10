export interface IUser {
  nome: string;
  email: string;
  cpf: string;
  cargo: 'perito' | 'policial' | 'assistente' | string;
  senha: string;
}