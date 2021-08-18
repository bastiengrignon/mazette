import React, { useState } from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { RouterUrl } from "../../constants"
import { CookieService } from "../../services/common/cookie.service"

interface CookieNoticeProps {
    textAccept?: string
    textDeny?: string
    onAccept?: () => void
    onDeny?: () => void
    cookieName?: string
}

const CookieNotice: React.FC<CookieNoticeProps> = ({
    textAccept = "Acceptez",
    textDeny = "Refuser",
    onAccept,
    onDeny,
    cookieName = CookieService.cookieName
}) => {
    const [isVisible, setVisibility] = useState<boolean>(!CookieService.cookieExists())

    const onClickAccept = () => {
        setVisibility(false)
        CookieService.set(cookieName, "true")
        onAccept && onAccept()
    }

    const onClickDeny = () => {
        setVisibility(false)
        CookieService.set(cookieName, "false")
        onDeny && onDeny()
    }

    return (
        <div className={`${ isVisible ? "flex" : "hidden" } z-40 fixed grid grid-cols-6 gap-y-3 items-center bottom-0 left-0 right-0 rounded-3xl md:rounded-full m-5 p-4 w-full sm:w-1/2 text-white mx-auto bg-darker`}>
            <p className="col-span-6 md:col-span-3 lg:col-span-4 xl:col-span-3 2xl:col-span-4 text-xs inline-flex items-center">
                <span className="text-3xl sm:text-4xl mr-2">🍪</span>
                <p>
                    Ce site utilise des cookies pour une meilleure expérience utilisateur (<Link to={ RouterUrl.mention } className="link">utilisation des cookies</Link>)
                </p>
            </p>
            <div className="col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-3 2xl:col-span-2 mx-auto space-x-0 md:space-x-2 lg:space-x-5">
                <Button shape="round" onClick={ onClickAccept } size="large" className="bg-green text-white shadow-xl border border-green hover:bg-white hover:text-green hover:border-green">
                    { textAccept }
                </Button>
                <Button shape="round" onClick={ onClickDeny } size="large" className="bg-darker text-ghost-white border-ghost-white hover:text-white hover:border-white hover:bg-darker">
                    { textDeny }
                </Button>
            </div>
        </div>
    )
}
export default CookieNotice