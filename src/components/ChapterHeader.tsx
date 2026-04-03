interface ChapterHeaderProps {
  number: string;
  groupEn: string;
  groupZh: string;
  titleEn: string;
  titleZh: string;
  ownerEn?: string;
  ownerZh?: string;
}

export default function ChapterHeader({
  number,
  groupEn,
  groupZh,
  titleEn,
  titleZh,
  ownerEn,
  ownerZh,
}: ChapterHeaderProps) {
  return (
    <div className="section-header">
      <div
        className="text-[10px] font-bold uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-turquoise-500)',
          letterSpacing: '0.14em',
        }}
      >
        <span className="en">Chapter {number} — {groupEn}</span>
        <span className="zh">第 {number} 章——{groupZh}</span>
      </div>
      <div
        className="my-1"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '34px',
          color: '#0A1A22',
          lineHeight: 1.15,
        }}
      >
        <span className="en">{titleEn}</span>
        <span className="zh">{titleZh}</span>
      </div>
      {ownerEn && (
        <div className="text-[11px]" style={{ color: 'var(--color-g500)', marginTop: '6px' }}>
          <span className="en">Owner: <b style={{ color: 'var(--color-ink)' }}>{ownerEn}</b></span>
          <span className="zh">負責：<b style={{ color: 'var(--color-ink)' }}>{ownerZh || ownerEn}</b></span>
        </div>
      )}
    </div>
  );
}
