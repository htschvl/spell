import { useEffect } from 'react';
import '../styles/PurchaseModal.scss';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftName: string;
}

const PurchaseModal = ({ isOpen, onClose, nftName }: PurchaseModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal">
        <div className="purchase-modal__content">
          <h2>NFT Sucessfully Purchased!</h2>
          <p>Congratulations, you acquired the NFT: <strong>{nftName}</strong></p>
          <p>You can view your NFT in your wallet.</p>
          
          <button className="purchase-modal__close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal; 