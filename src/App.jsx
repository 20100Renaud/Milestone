import Header from "./components/layout/Header";
import MapView from "./components/map/MapView";
import StatsPanel from "./components/stats/StatsPanel";
import Controls from "./components/controls/Controls";
import useLocation from "./hooks/useLocation";
import useTracker from "./hooks/useTracker";

function App() {
  const { location, error } = useLocation();
  const { route, isRecording, startRecording, stopRecording } =
    useTracker(location);

  return (
    <div className="flex flex-col h-screen bg-black ">
      <Header />

      <main className="flex-1 overflow-hidden">
        <MapView location={location} route={route} />
        {/*
        Later:
        <MapView location={location} route={route} waypoints={waypoints} /> */}
      </main>

      <StatsPanel location={location} error={error} route={route} />

      <Controls
        isRecording={isRecording}
        onStart={startRecording}
        onStop={stopRecording}
      />
    </div>
  );
}

export default App;
