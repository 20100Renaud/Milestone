import { useState } from "react";

function JourneyDialog({ journey, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!journey) return null;

  function handleSave() {
    onSave(title.trim(), description.trim());

    setTitle("");
    setDescription("");
  }

  function handleCancel() {
    setTitle("");
    setDescription("");
    onCancel();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 text-white">
        <h2 className="mb-4 text-xl font-semibold">Save Journey</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Title</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Morning walk"
              className="w-full rounded bg-slate-800 p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Description</label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
              className="w-full rounded bg-slate-800 p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="rounded bg-slate-700 px-4 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded bg-blue-600 px-4 py-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JourneyDialog;
