import React, {useContext} from "react"
import {Link} from 'react-router-dom'

import {titleSidebarItem, ISidebarItem} from "../../static-data/data/sidebar-data"
import {logoutStart} from "../../context/authContext/AuthActions"
import {AuthContext} from "../../context/authContext/AuthContext"

const SidebarItem: React.FC<ISidebarItem> = (props) => {
    const {dispatch} = useContext(AuthContext)
    const {title, icon, link, index, pathname} = props

    const active = link.split('/')[1] === pathname.split('/')[1] ? 'active' : ''

    const handleLogout = () => {
        if (dispatch) dispatch(logoutStart())
    }

    return(
        <>
            {index === 0 ? titleSidebarItem[0] : null}
            {index === 1 ? titleSidebarItem[1] : null}
            {index === 5 ? titleSidebarItem[2] : null}
            {index === 7 ? titleSidebarItem[3] : null}
            {index === 10 ? titleSidebarItem[4] : null}

            {
                title === 'Logout' ?
                    <Link to={link} className={active} onClick={handleLogout}>
                        <li>
                            {icon}
                            <span>{title}</span>
                        </li>
                    </Link>
                    :
                    <Link to={link} className={active}>
                        <li>
                            {icon}
                            <span>{title}</span>
                        </li>
                    </Link>
            }
        </>
    )
}

export default SidebarItem