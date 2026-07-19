import Header from "./components/layout/Header";
import MapView from "./components/map/MapView";
import StatsPanel from "./components/stats/StatsPanel";
import Controls from "./components/controls/Controls";

function App() {
  return (
    <div className="flex flex-col h-screen bg-black ">
      <Header />

      <main className="flex-1 overflow-hidden">
        <MapView />
      </main>

      <StatsPanel />

      <Controls />
    </div>
  );
}

export default App;
