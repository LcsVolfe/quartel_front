import { cnpj, cpf } from 'cpf-cnpj-validator';

const validators = {
    required: () => ({
        value: true,
        message: 'Campo Obrigatório.',
    }),
    minLength: (length) => ({
        value: length,
        message: `Digíte no mínimo ${length} caracteres.`,
    }),
    cpf: (data) => (cpf.isValid(data) ? null : 'Digite um CPF válido.'),
    cnpj: (data) => (cnpj.isValid(data) ? null : 'Digite um CNPJ válido.'),
};

export default validators;
