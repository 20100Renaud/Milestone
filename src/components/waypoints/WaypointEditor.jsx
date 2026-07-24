import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import CollapsiblePanel from "../layout/CollapsiblePanel";

function WaypointEditor({
  waypoints,
  selectedWaypoint,
  onSelectWaypoint,
  expanded,
  onToggle,
  onSave,
}) {
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
  }

  return (
    <CollapsiblePanel
      title={selectedWaypoint.title || "Untitled"}
      summary={`${currentIndex + 1} / ${waypoints.length}`}
      expanded={expanded}
      onToggle={onToggle}
      actions={
        <div className="flex items-center gap-2">
          <button onClick={selectPrevious}>
            <ChevronLeft />
          </button>

          <button onClick={selectNext}>
            <ChevronRight />
          </button>
        </div>
      }
    >
      <div className="space-y-3">
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
          className="flex mx-auto items-center gap-2 rounded bg-blue-600 px-4 py-2"
        >
          <Pencil size={16} />
          Save
        </button>
      </div>
    </CollapsiblePanel>
  );
}

export default WaypointEditor;
