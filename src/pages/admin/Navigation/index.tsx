import React, { useState } from "react"
import {
    DashboardOutlined,
    FireFilled,
    PlayCircleOutlined,
    TeamOutlined,
    VideoCameraOutlined,
    LogoutOutlined
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import { programmationTitle, RouterUrl } from "../../../constants"
import { authToken, Storage } from "../../../services/admin/storage/storage.services"
import { AuthenticationService } from "../../../services/admin/authentication/authentication.service"
import { Form, Input, message, Modal } from "antd"
import { AxiosError } from "axios"

const activatedClassCSS = "flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-100"
const deactivatedClassCSS = "flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"

const Navigation: React.FC = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(!AuthenticationService.connectedUserCookie())
    const [confirmLoginLoading, setConfirmLoginLoading] = useState(false)
    const [loginForm] = Form.useForm()
    const location = useLocation()

    const adminTitleFromPathname = (url: string): string => {
        if (url === RouterUrl.adminMovie) return programmationTitle.films
        else if (url === RouterUrl.adminMusic) return programmationTitle.musique
        else if (url === RouterUrl.adminPartner) return "Partenaires"
        else return "Dashboard"
    }

    const adminTabIcon = (url: string): React.ReactNode => {
        if (url === RouterUrl.adminMovie) return <VideoCameraOutlined />
        if (url === RouterUrl.adminMusic) return <PlayCircleOutlined />
        if (url === RouterUrl.adminPartner) return <TeamOutlined />
        else return <DashboardOutlined />
    }

    const logout = () => {
        window.location.href.replace("admin.", "")
        Storage.delete(authToken)
        window.location.reload()
    }

    const handleLogin = () => {
        setConfirmLoginLoading(true)
        loginForm.validateFields().then(values => {
            AuthenticationService
                .logInAsync(values)
                .then((result) => {
                    setConfirmLoginLoading(false)
                    setIsModalVisible(false)
                    Storage.set(authToken, "true")
                    message.success(`${ result.username } connecté`)
                })
                .catch(async (error: AxiosError) => {
                    await message.error(error.response?.data)
                    setConfirmLoginLoading(false)
                    Storage.set(authToken, "false")
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
                        <span className="text-white mx-2 font-semibold">Dashboard</span>
                    </Link>
                </div>
                <nav className="mt-10">
                    <Link to={ RouterUrl.home } className={ location.pathname === RouterUrl.home ? activatedClassCSS : deactivatedClassCSS }>
                        <DashboardOutlined />
                        <span className="mx-3 capitalize">Dashboard</span>
                    </Link>
                    <div>
                        {
                            Object.keys(RouterUrl).filter(key => key.match(/^admin.*$/g)).map((url, key) => {
                                const modifiedUrl = `/${ url.split("admin")[1].toString().toLowerCase() }`
                                return (
                                    <Link key={ key } to={ modifiedUrl } className={ location.pathname === modifiedUrl ? activatedClassCSS : deactivatedClassCSS }>
                                        { adminTabIcon(modifiedUrl) }
                                        <span className="mx-3 capitalize"> { adminTitleFromPathname(modifiedUrl) }</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <Link to={ RouterUrl.home } onClick={ logout } className={ `${deactivatedClassCSS} mt-24` }>
                        <LogoutOutlined />
                        <span className="mx-3 capitalize">Déconnexion</span>
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