import PeakLogo from '../assets/peak-logo.png'

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-primary text-primary-content fixed top-0 left-0 right-0 z-50">
        <button className="btn btn-ghost text-xl">CSV Cleaner</button>
        <img src={PeakLogo} className='w-32 h-16'/>
      </div>
    </>
  )
}

export default Navbar
