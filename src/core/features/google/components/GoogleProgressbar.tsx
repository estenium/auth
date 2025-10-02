'use client';

import { cn } from '@/core/utils';
import './GoogleProgressbar.css';

type TGoogleProgressbarProps = {
  isActive: boolean;
};

const GoogleProgressbar = ({ isActive }: TGoogleProgressbarProps) => {
  return (
    <div
      className={cn(`g-progressbar opacity-0`, {
        'opacity-100': isActive,
      })}
    >
      <div className="progress"></div>
    </div>
  );
};

export default GoogleProgressbar;
