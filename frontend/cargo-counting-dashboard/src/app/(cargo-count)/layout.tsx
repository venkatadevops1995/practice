
export default async function CargoCountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen  h-[100dvh] overflow-hidden grid px-[20px] pb-[2px] pt-[4px]  bg-[#F1F1F1]">
      {children}
    </div>
  )
}
