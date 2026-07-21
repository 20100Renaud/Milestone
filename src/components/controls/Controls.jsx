function Controls({ isRecording, onStart, onStop, onMark }) {
  return (
    <div className="flex justify-around bg-slate-900 p-4">
      {!isRecording ? (
        <button
          onClick={onStart}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Start a new journey
        </button>
      ) : (
        <button
          onClick={onStop}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Stop
        </button>
      )}

      {isRecording && (
        <button
          onClick={onMark}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-slate-500"
        >
          Mark
        </button>
      )}
    </div>
  );
}

export default Controls;
