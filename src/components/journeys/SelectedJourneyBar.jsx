import { X, Map } from "lucide-react";

function SelectedJourneyBar({ journey, onExit }) {
  if (!journey) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-700 bg-slate-900 px-4 py-3 text-white">
      <div className="flex items-center gap-2">
        <Map size={18} className="text-blue-400" />

        <div>
          <div className="font-semibold">{journey.title}</div>

          <div className="text-xs text-slate-400">Viewing saved journey</div>
        </div>
      </div>

      <button
        onClick={onExit}
        className="rounded p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
        title="Back to live mode"
      >
        <X size={20} />Close
      </button>
    </div>
  );
}

export default SelectedJourneyBar;
