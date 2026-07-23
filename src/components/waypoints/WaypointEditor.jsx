import { useEffect, useState } from "react";

function WaypointEditor({ waypoint, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Initialize waypoint
  useEffect(() => {
    if (!waypoint) {
      setTitle("");
      setDescription("");
      return;
    }

    setTitle(waypoint.title ?? "");
    setDescription(waypoint.description ?? "");
  }, [waypoint]);

  if (!waypoint) {
    return (
      <div className="bg-slate-900 p-4 text-white">
        <p>Select a marker to edit it.</p>
      </div>
    );
  }

  // Save
  function handleSave() {
    onSave(waypoint.id, {
      title: title.trim(),
      description: description.trim(),
    });

    onClose();
  }

  return (
    <div className="space-y-3 bg-slate-900 p-4 text-white">
      <h2 className="text-lg font-semibold">Edit waypoint</h2>

      <div>
        <label className="mb-1 block text-sm">Title</label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Waypoint title"
          className="w-full rounded border border-slate-600 bg-slate-800 p-2 text-white"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Description</label>

        <textarea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description..."
          className="w-full rounded border border-slate-600 bg-slate-800 p-2 text-white"
        />
      </div>

      <div className="flex justify-around">
        <button
          onClick={handleSave}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save
        </button>

        <button onClick={onClose} className="rounded bg-slate-600 px-4 py-2">
          Close
        </button>
      </div>
    </div>
  );
}

export default WaypointEditor;
