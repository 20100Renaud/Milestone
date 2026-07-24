import { Satellite } from "lucide-react";
import { getAccuracyStatus } from "../../utils/gps";

function GpsStatus({ location, error }) {
  if (error) {
    return (
      <div className="border-t border-slate-700 bg-slate-900 px-4 py-3 text-red-400">
        {error}
      </div>
    );
  }

  const accuracy = location?.coords?.accuracy;
  const status = getAccuracyStatus(accuracy);

  return (
    <div className="border-t border-slate-700 bg-slate-900 px-4 py-3 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Satellite size={18} className="text-blue-400" />
          <span className="font-medium">GPS</span>
        </div>

        <span className={status.className}>{status.label}</span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
        <span
          className={`h-2 w-2 rounded-full ${status.className.replace(
            "text-",
            "bg-",
          )}`}
        />

        {accuracy != null
          ? `Accuracy ±${Math.round(accuracy)} m`
          : "Searching for GPS..."}
      </div>
    </div>
  );
}

export default GpsStatus;
