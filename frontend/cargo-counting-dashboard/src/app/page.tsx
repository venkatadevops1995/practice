import CargoCountPage from "./(cargo-count)/page";
export default async function HomePage() {

  return (
    <main className="w-screen h-screen overflow-hidden grid px-[10px]">
      <CargoCountPage />
    </main>
  );
}
