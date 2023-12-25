import React from 'react'

export const Navbar = ({ itemList }) => {
    return (
        <ul>
            {itemList.map(item => {
                return <li><a href={item.url}>{item.label}</a></li>
            })}
        </ul>
    )
}
