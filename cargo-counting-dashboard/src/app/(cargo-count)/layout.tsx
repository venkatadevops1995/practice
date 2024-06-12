
export default async function CargoCountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  

  return (
    <div className="w-screen  h-[100dvh] overflow-hidden grid mobile:pl-[5px] pb-[10px] mobile:pr-[5px] pt-[10px] desktop:pl-[20px] desktop:pr-[20px] tablet:pl-[15px] tablet:pr-[15px] bg-[#F1F1F1]">
       {children}
    </div>
  )
}
