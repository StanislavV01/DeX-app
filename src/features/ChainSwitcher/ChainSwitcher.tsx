import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from '@/assets/arrow-down.svg';
import { ReactComponent as CheckIcon } from '@/assets/checkIcon.svg';
import styles from './ChainSwitcher.module.css';
import { useMetaMask } from '@/hooks/useMetamask';
import { blockchainInfo } from '@/Context/blockChainInfo';

function ChainSwitcher() {
  const { activeChain, handleChange } = useMetaMask();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.switchBox} onClick={handleOpen}>
        <div className={styles.chainLogo}>
          <img src={activeChain.icon} alt={activeChain.name} />
        </div>
        <div className={styles.arrowIcon}>
          <ArrowIcon />
        </div>
      </div>
      {isOpen && <ChainBox handleChange={handleChange} activeChainId={activeChain.chainId} />}
    </div>
  );
}

const ChainBox: React.FC<{ handleChange: (chainId: string) => void; activeChainId: string }> = ({
  handleChange,
  activeChainId,
}) => (
  <div className={styles.chainBox}>
    <div className={styles.list}>
      {blockchainInfo.map((item) => (
        <div className={styles.item} onClick={() => handleChange(item.chainId)} key={item.chainId}>
          <div className={styles.itemImg}>
            <img src={item.icon} alt={item.name} />
          </div>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.itemIsChecked}>{item.chainId === activeChainId && <CheckIcon />}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ChainSwitcher;
