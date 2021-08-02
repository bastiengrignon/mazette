import React, { useState } from "react"
import Navigation from "../Navigation"
import { Button, Form, Input, message, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import { AuthenticationService } from "../../../services/admin/authentication/authentication.service"
import { authToken, Storage } from "../../../services/admin/storage/storage.services"


const Dashboard: React.FC = () => {
    const connectedUserCookie = (): boolean => Storage.get(authToken) === "true"

    const [isModalVisible, setIsModalVisible] = useState(!connectedUserCookie())
    const [form] = useForm()

    const handleLogin = () => {
        form.validateFields()
            .then(values => {
                AuthenticationService
                    .logInAsync(values)
                    .then(() => Storage.set(authToken, "true"))
                    .catch(() => Storage.delete(authToken))
                    .finally(() => form.resetFields())
                setIsModalVisible(false)
            })
            .catch(info => message.warn("Validation failed: ", info))
    }

    return (
        <Navigation>
            <Modal title="Admin Login" visible={ isModalVisible } footer={ null } closable={ false }>
                <Form name="login_form" form={ form } onFinish={ handleLogin } initialValues={ { remember: true } }>
                    <Form.Item label="Nom d'utilisateur" name="username" rules={ [{ required: true, message: "Veuillez entrer votre nom d'utilisateur!" }] }>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Mot de passe" name="password" rules={ [{ required: true, message: "Veuillez entrer votre mot de passe !" }] }>
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Connexion
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Navigation>
    )
}
export default Dashboard