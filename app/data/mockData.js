// Dados do usuário
export const userData = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    dataNascimento: "15/05/1990",
    endereco: {
      rua: "Rua das Flores, 123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567"
    }
  };
  
  // Dados dos pedidos
  export const pedidos = [
    { 
      id: "#12345", 
      data: "10/10/2023", 
      produtos: "Whey Protein, Creatina", 
      valor: "R$ 250,00", 
      status: "Entregue" 
    },
    { 
      id: "#12344", 
      data: "05/10/2023", 
      produtos: "Multivitamínico", 
      valor: "R$ 80,00", 
      status: "Em processamento" 
    },
    { 
      id: "#12343", 
      data: "01/10/2023", 
      produtos: "Barra de Proteína", 
      valor: "R$ 50,00", 
      status: "Cancelado" 
    },
  ];
  
  // Histórico de rastreio
  export const historicoRastreio = [
    { etapa: "Pedido Entregue", data: "12/10/2023, 14:30" },
    { etapa: "Enviado", data: "11/10/2023, 09:00" },
    { etapa: "Em Separação", data: "10/10/2023, 18:00" },
    { etapa: "Pedido Recebido", data: "10/10/2023, 15:45" },
  ];