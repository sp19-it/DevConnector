import React from 'react'

// RFC 
function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  )
}

export default Footer
