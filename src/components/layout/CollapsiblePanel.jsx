import { ChevronDown, ChevronUp } from "lucide-react";

function CollapsiblePanel({
  title,
  summary,
  expanded,
  onToggle,
  children,
  actions,
}) {
  return (
    <div className="border-t border-slate-700 bg-slate-900 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onToggle}
          className="flex flex-1 items-center justify-between text-left"
        >
          <div>
            <div className="font-semibold">{title}</div>

            {summary && (
              <div className="mt-1 text-sm">{summary}</div>
            )}
          </div>

          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {actions && <div className="ml-3 flex items-center">{actions}</div>}
      </div>

      {expanded && (
        <div className="border-t border-slate-700 p-4">{children}</div>
      )}
    </div>
  );
}

export default CollapsiblePanel;
