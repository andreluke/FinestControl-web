export function ScreenSizeDebug() {
  return (
    <div className="right-2 bottom-2 z-50 fixed bg-black opacity-80 px-2 py-1 rounded text-white text-xs pointer-events-none">
      <div className="sm:hidden block">xs</div>
      <div className="hidden md:hidden sm:block">sm</div>
      <div className="hidden lg:hidden md:block">md</div>
      <div className="hidden xl:hidden lg:block">lg</div>
      <div className="hidden 2xl:hidden xl:block">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
