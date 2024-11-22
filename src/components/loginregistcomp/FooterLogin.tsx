
import logo from '../../assets/logo/440px-Lambang_Kabupaten_Sumbawa.png'

const FooterLogin = () => {
  return (
    <div className='w-full h-[109px] flex justify-center items-center bg-[#02032F] '>
        <div className=''>
            <div className='flex justify-center'>

            <img className='w-[39px] h-[57px] ' src={logo} alt="" />
            </div>
            <p className='text-center text-white'>© 2024 siTawa. All rights reserved</p>

        </div>

    </div>
  )
}

export default FooterLogin