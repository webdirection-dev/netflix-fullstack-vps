import React, { Dispatch, SetStateAction, FC } from "react"
import './sidebar.scss'

import SidebarItem from "./SidebarItem"

import { sidebarData } from "../../static-data/data/sidebar-data"
import { useLocation } from "react-router-dom"

interface IAside {
    setDark: Dispatch<SetStateAction<boolean>>
    dark: boolean
}

const Sidebar: FC<IAside> = ({ setDark, dark }) => {
    const { pathname } = useLocation()

    return (
        <aside className='sidebar'>
            <div className="top">
                <a href='https://demo1.apwdev.ru' className="logo">My Netflix</a>
            </div>

            <hr />

            <div className="center">
                <ul>
                    {
                        sidebarData.map((i, index) => {
                            return (
                                <SidebarItem key={i.title} index={index} pathname={pathname} {...i} />
                            )
                        })
                    }
                </ul>
            </div>

            <div className="bottom">
                <div className="border-style" onClick={() => setDark(false)}>
                    <div className="colorOption light"></div>
                </div>

                <div className="border-style" onClick={() => setDark(true)}>
                    <div className="colorOption gray"></div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar