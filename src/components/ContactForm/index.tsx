import emailJs from 'emailjs-com'
import loadable from '@loadable/component'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'

const Notification = loadable(() => import('../Notification'))

const successMessage = 'Message envoyé'
const errorMessage = 'Une erreur est survenue ! Ré-essayer plus tard'

const isEnvVariablesUndefined =
    import.meta.env.VITE_EMAILJS_SERVICE_ID === undefined ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID === undefined ||
    import.meta.env.VITE_EMAILJS_USER_ID === undefined

const ContactForm: React.FC = () => {
    const [messageSent, setMessageSent] = useState<boolean>(false)
    const [messageSentLoading, setMessageSentLoading] = useState<boolean>(false)
    const [messageSentError, setMessageSentError] = useState<boolean>(false)

    const [contactForm] = Form.useForm()
    const initialValues = { name: '', email: '', subject: '', message: '' }

    const sendEmail = ({ name, email, subject, message }): void => {
        setMessageSentLoading(true)
        const templateParameters = {
            fromName : name,
            userEmail: email,
            subject  : subject,
            message  : message
        }
        if (isEnvVariablesUndefined) {
            console.warn('No variable env found')
            setMessageSentLoading(false)
            return
        }

        emailJs.send(String(import.meta.env.VITE_EMAILJS_SERVICE_ID),
            String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
            templateParameters,
            String(import.meta.env.VITE_EMAILJS_USER_ID))
            .then(() => {
                setMessageSent(true)
                contactForm.resetFields()
            })
            .catch(() => {
                setMessageSent(false)
                setMessageSentError(true)
            })
            .finally(() => setMessageSentLoading(false))
    }

    return (
        <div className="flex flex-col w-full sm:w-2/3 xl:w-2/5">
            <Form
                onFinish={ sendEmail }
                form={contactForm}
                layout="vertical"
                initialValues={initialValues}
                scrollToFirstError
                className="max-w-lg"
            >
                <div className="flex items-center space-x-2 w-full">
                    <Form.Item
                        className="w-2/5"
                        label="Votre nom"
                        name="name"
                        required={ true }
                        rules={[{ required: true, message: 'Entrez votre nom' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="w-3/5"
                        label="Votre e-mail"
                        name="email"
                        required={ true }
                        hasFeedback
                        rules={[{ required: true, type: 'email', message: 'Entrez une adresse mail valide !' }]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item label="Sujet" name="subject">
                    <Input />
                </Form.Item>
                <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Dites-nous tout en quelques mots !' }]}>
                    <Input.TextArea rows={ 5 } />
                </Form.Item>
                <Form.Item>
                    <div className="flex items-center space-x-2">
                        <Button
                            htmlType="submit"
                            loading={ messageSentLoading }
                            className="website-button">
                        Envoyer
                        </Button>
                        <span>
                            {messageSent && <Notification text={ messageSentError ? errorMessage : successMessage }/> }
                        </span>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ContactForm
