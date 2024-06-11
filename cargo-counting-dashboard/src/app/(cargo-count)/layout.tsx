
export default async function CargoCountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  

  return (
    <div className="w-screen  h-[100dvh] overflow-hidden grid pl-[10px] pb-[5px] pr-[10px] pt-[5px]   bg-[#F1F1F1]">
       {children}
    </div>
  )
}
