import { Filters } from "./filters";

export const Header = () => {
  return (
    <header className="bg-[#103f62] px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <Filters />
      </div>
    </header>
  );
};
