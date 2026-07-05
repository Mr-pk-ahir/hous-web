
export default function Header() {
  return (
    <div
        className={`w-full h-full flex p-2 justify-between items-center`}
    >
        <div className={` h-full w-80 flex justify-center gap-5 p-4 items-center`}>
            <span className={`w-13 h-13 rounded-full border`}></span>
            <h1 className={`text-4xl font-bold `}>THousing</h1>
        </div>
    </div>
  )
}
