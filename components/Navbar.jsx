import React, { useEffect } from 'react'

const Navbar = ({connected,account,connectWallet}) => {    
  return (
    <nav className='h-20 flex items-center px-8 justify-between bg-sky-100'>
        <div>
            <h1>Logo</h1>
        </div>
        <div>
            {
                !connected ?
                <button onClick={connectWallet} className='px-5 py-3 bg-sky-600 rounded-md  text-white'>Connect Wallet</button>
                :
                <div>
                    <p>{account}</p>
                </div>

            }
        </div>
    </nav>
  )
}

export default Navbar