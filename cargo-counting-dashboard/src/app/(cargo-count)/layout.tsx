
export default async function CargoCountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  

  return (
    <div className="w-screen  h-[100dvh] overflow-hidden grid mobile:pl-[10px] pb-[10px] mobile:pr-[10px] pt-[10px] desktop:pl-[20px] desktop:pr-[20px] tablet:pl-[20px] tablet:pr-[20px] bg-[#F1F1F1]">
       {children}
    </div>
  )
}
