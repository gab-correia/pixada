// src/componentes/ThankYouMessage/index.tsx
import { useEffect, useState } from 'react';
import './styles.css';

interface ThankYouMessageProps {
  duration?: number;
}

const ThankYouMessage = ({ duration = 3000 }: ThankYouMessageProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  
  useEffect(() => {
    // Iniciar animação de fade-out após um tempo
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 1000); // Iniciar o fade-out 1 segundo antes do componente ser removido
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  return (
    <div className={`thank-you-message ${isVisible ? 'visible' : 'fade-out'}`}>
      <div className="message-content">
        <div className="check-icon">✓</div>
        <h3>Obrigado pela sua doação!</h3>
        <p>Sua contribuição é muito importante para nós</p>
      </div>
    </div>
  );
};

export default ThankYouMessage;