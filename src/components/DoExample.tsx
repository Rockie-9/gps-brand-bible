import { ReactNode } from 'react';

interface DoExampleProps {
  doContent: ReactNode;
  dontContent: ReactNode;
}

export default function DoExample({ doContent, dontContent }: DoExampleProps) {
  return (
    <div className="do-dont">
      <div className="do-card">
        <b className="block text-[9px] uppercase mb-1" style={{ color: 'var(--color-turquoise-700)', letterSpacing: '0.1em' }}>
          <span className="en">Do</span><span className="zh">正確</span>
        </b>
        {doContent}
      </div>
      <div className="dont-card">
        <b className="block text-[9px] uppercase mb-1" style={{ color: 'var(--color-danger)', letterSpacing: '0.1em' }}>
          <span className="en">Don&apos;t</span><span className="zh">錯誤</span>
        </b>
        {dontContent}
      </div>
    </div>
  );
}
