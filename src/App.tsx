// src/App.tsx
import { useState } from 'react';
import useDonations from './hooks/useDonations';
// Note: Vamos adicionar os imports dos componentes quando os criarmos

function App() {
  // Estado para controlar o movimento dos blocos
  const [blockMovement, setBlockMovement] = useState<number>(0);
  
  // Estado para mostrar mensagem de agradecimento
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  // Use o hook personalizado para gerenciar doações
  const { donations, addDonation } = useDonations([
    { id: 1, name: 'Ana Silva', amount: 500 },
    { id: 2, name: 'João Oliveira', amount: 350 },
    { id: 3, name: 'Maria Santos', amount: 200 },
    { id: 4, name: 'Pedro Costa', amount: 150 },
    { id: 5, name: 'Carla Dias', amount: 80 }
  ]);

  // Função para processar uma nova doação
  const handleDonation = (name: string, amount: number) => {
    addDonation(name, amount);
    
    // Aciona o movimento dos blocos
    setBlockMovement(amount);
    
    // Mostra a mensagem de agradecimento
    setShowThankYou(true);
    
    // Esconde a mensagem após 3 segundos
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1>Faça sua Doação</h1>
        {/* Adicione o componente DonationForm aqui quando criado */}
        {/* <DonationForm onDonate={handleDonation} /> */}
      </div>
      
      <div className="right-panel">
        {/* Adicione os componentes quando criados */}
        {/* <DonatorsRanking donators={donations} /> */}
        {/* <MovingBlocks movementAmount={blockMovement} /> */}
      </div>
      
      {/* Adicione a mensagem de agradecimento quando criada */}
      {/* {showThankYou && <ThankYouMessage />} */}
    </div>
  );
}

export default App;