import React from 'react'
import styled from 'styled-components'


export const Navbar = ({ items }) => {
   const StyledNav = styled.nav`
    
   `
    return (
        <nav>
            <ul>
                {items.map(item => (
                    <li>
                        <a href={item.url}>
                                <img src={item.src}/>
                                <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
       </nav>
    )
}
