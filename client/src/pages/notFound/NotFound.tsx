import React from "react"
import {Link} from "react-router-dom"

type INotFound = {
    verify: boolean
}

const NotFound: React.FC<INotFound> = ({verify}) => {

    return (
        <>
            <h2>Page non Found...</h2>
            {verify ?
                <h3>Go to <Link to='/'>homepage</Link></h3> :
                <h3>Only for register users <Link to='/register'>Please, register or login.</Link></h3>
            }
        </>
    )
}

export default NotFound