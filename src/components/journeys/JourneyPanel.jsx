// src/components/journeys/JourneyPanel.jsx
import { useEffect, useState } from "react";
import { X, Map, Route, Calendar, CalendarX } from "lucide-react";
import CollapsiblePanel from "../layout/CollapsiblePanel";

function JourneyPanel({ journey, expanded, onToggle, onExit, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!journey) return;

    setTitle(journey.title ?? "");
    setDescription(journey.description ?? "");
  }, [journey]);

  if (!journey) return null;

  function handleSave() {
    onSave({
      title: title.trim(),
      description: description.trim(),
    });
  }

  return (
    <CollapsiblePanel
      title="Edited journey:"
      summary={journey.title || "Untitled"}
      expanded={expanded}
      onToggle={onToggle}
      actions={
        <button
          onClick={onExit}
          className="rounded p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
          title="Back to live mode"
        >
          <X size={18} />
        </button>
      }
    >
      <div className="space-y-4 text-sm">
        {/* Info */}
        <div className="space-y-2 text-slate-300">
          <div className="flex items-center gap-2">
            <Map size={16} />
            <span>
              {
                journey.waypoints.filter((point) => point.type === "mark")
                  .length
              }{" "}
              markers
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Route size={16} />
            <span>
              {journey.distance >= 1000
                ? `${(journey.distance / 1000).toFixed(2)} km`
                : `${journey.distance.toFixed(1)} m`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(journey.startedAt).toLocaleString()}</span>
          </div>

          {journey.endedAt && (
            <div className="flex items-center gap-2">
              <CalendarX size={16} />{" "}
              <span>{new Date(journey.endedAt).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Edit */}
        <div>
          <label className="block text-sm mb-1">Title</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded bg-slate-800 p-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>

          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded bg-slate-800 p-2"
          />
        </div>

        <button onClick={handleSave} className="rounded bg-blue-600 px-4 py-2">
          Save changes
        </button>
      </div>
    </CollapsiblePanel>
  );
}

export default JourneyPanel;
