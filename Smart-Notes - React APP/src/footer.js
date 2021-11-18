import React from 'react'

function Footer() {
    return (
        <div>
            <p style={
                {
                    position:"relative",
                    bottom:"0",
                    width:"100%",
                    textAlign:"center"
                }
            }>
                Copyright &copy; {new Date().getFullYear()} Simon Benhamou
            </p>
        </div>
    )
}

export default Footer
