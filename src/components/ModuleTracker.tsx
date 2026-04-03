interface ModuleTrackerProps {
  modules: Array<{ name: string; status: 'done' | 'wip' | 'todo' }>;
}

export default function ModuleTracker({ modules }: ModuleTrackerProps) {
  return (
    <div className="module-tracker">
      {modules.map((m) => (
        <span key={m.name} className="module-pill">
          <span className={`module-dot module-dot-${m.status}`} />
          {m.name}
        </span>
      ))}
    </div>
  );
}
