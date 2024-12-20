const gerarIdempotencyKey = () =>{
  // Gera uma chave usando a data atual e um valor aleatório
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

module.exports = {

  gerarIdempotencyKey,
 
};
