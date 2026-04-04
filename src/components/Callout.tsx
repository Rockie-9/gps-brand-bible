import { ReactNode } from 'react';

interface CalloutProps {
  type?: 'tip' | 'warning';
  children: ReactNode;
}

export default function Callout({ type = 'tip', children }: CalloutProps) {
  return (
    <div className={`callout callout-${type}`}>
      {children}
    </div>
  );
}
