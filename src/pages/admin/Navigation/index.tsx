import React, { useState } from "react"
import {
    DashboardOutlined,
    FireFilled,
    PlayCircleOutlined,
    TeamOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
    AppstoreOutlined
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import { programmationTitle, RouterUrl } from "../../../constants"
import { AuthenticationService } from "../../../services/admin/authentication/authentication.service"
import { Form, Input, message, Modal } from "antd"
import { AxiosError } from "axios"
import { CookieService } from "../../../services/common/cookie.service"

const activatedClassCSS = "flex items-center py-2 px-6 bg-gray-200 bg-opacity-1 text-gray-700 hover:text-gray-900 rounded-l-full"
const deactivatedClassCSS = "flex items-center py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"

const Navigation: React.FC = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(!AuthenticationService.connectedUserCookie())
    const [confirmLoginLoading, setConfirmLoginLoading] = useState<boolean>(false)
    const [loginForm] = Form.useForm()
    const location = useLocation()

    const adminTitleFromPathname = (url: string): string => {
        if (url === RouterUrl.adminMovie) return programmationTitle.films
        else if (url === RouterUrl.adminMusic) return programmationTitle.musique
        else if (url === RouterUrl.adminPartner) return "Partenaires"
        else if (url === RouterUrl.adminTrombinoscope) return "Trombinoscope"
        else return "Dashboard"
    }

    const adminTabIcon = (url: string): React.ReactNode => {
        if (url === RouterUrl.adminMovie) return <VideoCameraOutlined />
        if (url === RouterUrl.adminMusic) return <PlayCircleOutlined />
        if (url === RouterUrl.adminPartner) return <TeamOutlined />
        if (url === RouterUrl.adminTrombinoscope) return <AppstoreOutlined />
        else return <DashboardOutlined />
    }

    const logout = () => AuthenticationService.logout()

    const handleLogin = () => {
        setConfirmLoginLoading(true)
        loginForm.validateFields().then(values => {
            AuthenticationService
                .logInAsync(values)
                .then((result) => {
                    setConfirmLoginLoading(false)
                    setIsModalVisible(false)
                    CookieService.set(CookieService.authToken, "true", 60 * 60 * 2) // 2 hours
                    message.success(`${ result.username } connecté`)
                })
                .catch(async (error: AxiosError) => {
                    await message.error(error.response?.data)
                    setConfirmLoginLoading(false)
                    CookieService.set(CookieService.authToken, "false")
                })
                .finally(() => loginForm.resetFields())
        }).catch(info => message.warning("Validation failed: ", info))
    }

    return (
        <div className="grid grid-cols-6 h-screen">
            <div className="col-span-2 md:col-span-1 bg-gray-900">
                <div className="flex items-center justify-center mt-8">
                    <Link to={ RouterUrl.home } className="inline-flex justify-center items-center text-2xl">
                        <FireFilled className="text-green"/>
                        <span className="text-white mx-2 font-semibold">Mazette! Dashboard</span>
                    </Link>
                </div>
                <nav className="my-10 capitalize">
                    <Link to={ RouterUrl.home } className={ location.pathname === RouterUrl.home ? activatedClassCSS : deactivatedClassCSS }>
                        <DashboardOutlined />
                        <span className="mx-3">Dashboard</span>
                    </Link>
                    <div className="mt-2.5 space-y-2.5">
                        {
                            Object.keys(RouterUrl).filter(key => key.match(/^admin.*$/g)).map((url, key) => {
                                const modifiedUrl = `/${ url.split("admin")[1].toString().toLowerCase() }`
                                return (
                                    <Link key={ key } to={ modifiedUrl } className={ location.pathname === modifiedUrl ? activatedClassCSS : deactivatedClassCSS }>
                                        { adminTabIcon(modifiedUrl) }
                                        <span className="mx-3"> { adminTitleFromPathname(modifiedUrl) }</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <Link to={ RouterUrl.home } onClick={ logout } className={ `${deactivatedClassCSS} mt-24` }>
                        <LogoutOutlined />
                        <span className="mx-3">Déconnexion</span>
                    </Link>
                </nav>
            </div>
            <div className="col-span-4 md:col-span-5 bg-gray-200">
                <header className="flex justify-center text-xl py-1 bg-white border-b-4 border-green font-avenir capitalize">
                    { adminTitleFromPathname(location.pathname) }
                </header>
                <main className="overflow-x-hidden overflow-y-auto px-4 mt-4">
                    { !isModalVisible && children }
                </main>
            </div>
            <Modal title="Admin Login" visible={ isModalVisible } closable={ false } cancelButtonProps={{ style: { display: "none" } }}
                confirmLoading={ confirmLoginLoading } onOk={ handleLogin } okText="Connexion">
                <Form name="login_form" form={ loginForm } initialValues={{ remember: true }}>
                    <Form.Item label="Nom d'utilisateur" name="username" rules={ [{ required: true, message: "Veuillez entrer votre nom d'utilisateur!" }] }>
                        <Input autoFocus={ true }/>
                    </Form.Item>
                    <Form.Item label="Mot de passe" name="password" rules={ [{ required: true, message: "Veuillez entrer votre mot de passe !" }] }>
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Navigation