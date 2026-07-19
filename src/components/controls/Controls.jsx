function Controls() {
  return (
    <div className="flex justify-around bg-slate-900 p-4">
      <button className="rounded bg-green-600 px-4 py-2 text-white">
        Start
      </button>

      <button className="rounded bg-blue-600 px-4 py-2 text-white">Mark</button>

      <button className="rounded bg-red-600 px-4 py-2 text-white">Stop</button>
    </div>
  );
}

export default Controls;
