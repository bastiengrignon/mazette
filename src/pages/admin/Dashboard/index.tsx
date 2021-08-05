import React, { useEffect, useState } from "react"
import Navigation from "../Navigation"
import {
    Button,
    Card,
    Form,
    Input,
    List,
    message,
    Modal,
    Skeleton,
    Typography
} from "antd"
import { useForm } from "antd/es/form/Form"
import { AuthenticationService } from "../../../services/admin/authentication/authentication.service"
import { authToken, Storage } from "../../../services/admin/storage/storage.services"
import { IText } from "../../../services/admin/text/text.interface"
import { TextService } from "../../../services/admin/text/text.service"

const Dashboard: React.FC = () => {
    const connectedUserCookie = (): boolean => Storage.get(authToken) === "true"

    const [isModalVisible, setIsModalVisible] = useState(!connectedUserCookie())
    const [isTextLoading, setIsTextLoading] = useState<boolean>(false)
    const [loginForm] = useForm()
    const [texts, setTexts] = useState<IText[]>([])

    const handleLogin = () => {
        loginForm.validateFields()
            .then(values => {
                AuthenticationService
                    .logInAsync(values)
                    .then(() => Storage.set(authToken, "true"))
                    .catch(() => Storage.delete(authToken))
                    .finally(() => loginForm.resetFields())
                setIsModalVisible(false)
            })
            .catch(info => message.warn("Validation failed: ", info))
    }

    useEffect(() => {
        setIsTextLoading(true)
        TextService.getAll()
            .then(texts => setTexts(texts))
            .finally(() => setIsTextLoading(false))
    }, [])

    const renderListTextItem = (item: IText, key: number) => (
        <List.Item key={ key } className="inline-flex items-center justify-between w-full">
            <div>{ item.text }</div>
            <Typography.Link className="ml-5" href="" onClick={() => console.log("")}>
                Modifier
            </Typography.Link>
        </List.Item>
    )

    return (
        <Navigation>
            {
                !isModalVisible &&
                    <div className="grid grid-cols-6">
                        <Card bordered={ false } className="rounded-lg col-span-3">
                            <p className="text-xl mb-2">Textes d’introduction : </p>
                            <Skeleton avatar={ true } active={ true } loading={ isTextLoading } >
                                <List dataSource={ texts } renderItem={ renderListTextItem }/>
                            </Skeleton>
                        </Card>
                    </div>
            }
            <Modal title="Admin Login" visible={ isModalVisible } footer={ null } closable={ false }>
                <Form name="login_form" form={ loginForm } onFinish={ handleLogin } initialValues={ { remember: true } }>
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