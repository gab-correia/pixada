// src/componentes/DonatorsRanking/index.tsx
import { useMemo } from 'react';
import { Donator } from '../../types';
import './styles.css';

interface DonatorsRankingProps {
  donators: Donator[];
}

const DonatorsRanking = ({ donators }: DonatorsRankingProps) => {
  // Ordenar doadores por valor (do maior para o menor)
  const sortedDonators = useMemo(() => {
    return [...donators].sort((a, b) => b.amount - a.amount);
  }, [donators]);

  // Calcular total arrecadado
  const totalDonated = useMemo(() => {
    return donators.reduce((sum, donator) => sum + donator.amount, 0);
  }, [donators]);

  return (
    <div className="donators-ranking">
      <h2>Ranking de Doadores</h2>
      
      <div className="total-container">
        <div className="total-label">Total arrecadado:</div>
        <div className="total-value">R$ {totalDonated.toFixed(2)}</div>
      </div>
      
      {sortedDonators.length === 0 ? (
        <div className="no-donations">
          Nenhuma doação registrada ainda. Seja o primeiro!
        </div>
      ) : (
        <ul className="donators-list">
          {sortedDonators.map((donator, index) => (
            <li 
              key={donator.id} 
              className={`donator-item ${index < 3 ? `top-${index + 1}` : ''}`}
            >
              <div className="ranking-number">{index + 1}</div>
              <div className="donator-info">
                <div className="donator-name">{donator.name}</div>
                <div className="donator-amount">R$ {donator.amount.toFixed(2)}</div>
                {donator.timestamp && (
                  <div className="donator-date">
                    {new Date(donator.timestamp).toLocaleDateString()}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonatorsRanking;