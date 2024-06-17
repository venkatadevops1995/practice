
export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen  h-[100dvh] overflow-hidden grid bg-[#F1F1F1]">
         {children}
 
    </div>
  )
}
