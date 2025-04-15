// src/componentes/DonationForm/index.tsx
import { useState } from 'react';
import pixService from '../../services/pixService';
import './styles.css';

interface DonationFormProps {
  onDonate: (name: string, amount: number) => void;
}

const DonationForm = ({ onDonate }: DonationFormProps) => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      setError('Por favor, informe um valor válido para doação.');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Simular processamento de pagamento PIX
      const result = await pixService.processPayment(amount);
      
      if (result.success) {
        onDonate(name, amount);
        // Limpar formulário
        setName('');
        setAmount(0);
      } else {
        setError('Erro ao processar pagamento. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Valores pré-definidos para facilitar doações
  const predefinedValues = [10, 25, 50, 100, 200];

  return (
    <div className="donation-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Seu Nome (opcional)</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Deixe em branco para doar anonimamente"
            disabled={isProcessing}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Valor da Doação (R$)</label>
          <input
            type="number"
            id="amount"
            value={amount || ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Digite o valor da doação"
            min="1"
            required
            disabled={isProcessing}
          />
        </div>
        
        <div className="predefined-values">
          {predefinedValues.map((value) => (
            <button
              key={value}
              type="button"
              className="value-button"
              onClick={() => setAmount(value)}
              disabled={isProcessing}
            >
              R$ {value}
            </button>
          ))}
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processando...' : 'Doar via PIX'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;