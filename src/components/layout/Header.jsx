import { Compass } from "lucide-react";


function Header() {
  return (
    <header className="bg-slate-900 p-4 text-center text-white">
      <div className="flex flex-col mx-auto w-fit">
        <div className="flex font-bold text-white text-2xl justify-center items-center gap-2 border-b">
          <Compass />
          <div>
            Miles<span className="text-[#FF5900]">Stone</span>
          </div>
        </div>
        <h1 className="text-sm font-bold">GPS Walk Tracker</h1>
      </div>
    </header>
  );
}

export default Header;
