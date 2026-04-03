'use client';

interface CrossRefProps {
  section: string;
  children: React.ReactNode;
}

export default function CrossRef({ section, children }: CrossRefProps) {
  const handleClick = () => {
    const event = new CustomEvent('gps-navigate', { detail: { section } });
    window.dispatchEvent(event);
  };

  return (
    <a className="cross-ref" onClick={handleClick}>
      {children}
    </a>
  );
}
