import React from 'react'

function AuthLayout({children}) {
  return (
    <div>
        <div className=''>
        <h2 className=''>Expense Tracker</h2>  
        {children}
        </div>
    </div>
  )
}

export default AuthLayout