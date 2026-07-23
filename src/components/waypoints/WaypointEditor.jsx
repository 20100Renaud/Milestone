import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Pencil,
} from "lucide-react";

function WaypointEditor({
  waypoints,
  selectedWaypoint,
  onSelectWaypoint,
  onSave,
}) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const currentIndex = waypoints.findIndex(
    (point) => point.id === selectedWaypoint?.id,
  );

  useEffect(() => {
    if (!selectedWaypoint) return;

    setTitle(selectedWaypoint.title ?? "");
    setDescription(selectedWaypoint.description ?? "");
  }, [selectedWaypoint]);

  if (!selectedWaypoint) {
    return null;
  }

  // Previous point
  function selectPrevious() {
    const newIndex =
      currentIndex <= 0 ? waypoints.length - 1 : currentIndex - 1;

    onSelectWaypoint(waypoints[newIndex].id);
  }

  // Next point
  function selectNext() {
    const newIndex =
      currentIndex >= waypoints.length - 1 ? 0 : currentIndex + 1;

    onSelectWaypoint(waypoints[newIndex].id);
  }

  // Save point
  function handleSave() {
    onSave(selectedWaypoint.id, {
      title: title.trim(),
      description: description.trim(),
    });
    setExpanded(false);
  }

  return (
    <div className="bg-slate-900 text-white border-t border-slate-700">
      {/* collapsed bar */}
      <div className="flex items-center gap-3 px-3 py-2">
        <button onClick={selectPrevious}>
          <ChevronLeft />
        </button>

        <div className="flex-1 text-center">
          <div className="font-semibold">
            {selectedWaypoint.title || "Untitled"}
          </div>

          <div className="text-xs text-slate-400">
            {currentIndex + 1} / {waypoints.length}
          </div>
        </div>

        <button onClick={selectNext}>
          <ChevronRight />
        </button>

        <button onClick={() => setExpanded(!expanded)} className="ml-2">
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {expanded && (
        <div className="space-y-3 border-t border-slate-700 p-4">
          <div>
            <label className="text-sm">Title</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded bg-slate-800 p-2"
            />
          </div>

          <div>
            <label className="text-sm">Description</label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded bg-slate-800 p-2"
            />
          </div>

          <button
            onClick={handleSave}
            className="flex justify-end items-center gap-2 rounded bg-blue-600 px-4 py-2"
          >
            <Pencil size={16} />
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default WaypointEditor;
