import React, { useState } from "react"
import Input from "../Input"
import emailJs from "emailjs-com"
import Notification from "../Notification"

const successMessage = "Votre message à bien été envoyé"
const errorMessage = "Une erreur est survenue ! Ré-essayer plus tard"

const ContactForm: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [messageSent, setMessageSent] = useState<boolean>(false)
    const [messageSentError, setMessageSentError] = useState<boolean>(false)
    const [emailValid, setEmailValid] = useState<boolean>(true)
    const [nameValid, setNameValid] = useState<boolean>(true)

    const templateParameters = {
        fromName: name,
        userEmail: email,
        subject: subject,
        message: message
    }

    const validName = (value: string): void => {
        if (value) {
            setNameValid(true)
            setName(value)
        } else setNameValid(false)
    }

    const validEmail = (value: string): void => {
        const regexpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (regexpEmail.test(value)) {
            setEmailValid(true)
            setEmail(value)
        } else setEmailValid(false)
    }

    const clearInput = (): void => {
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
        Array.from(document.querySelectorAll("input, textarea")).forEach(input => input["value"] = "")
    }

    const sendEmail = (): void => {
        if (!!name && !!email) {
            if (process.env.REACT_APP_EMAILJS_SERVICE_ID === undefined
                || process.env.REACT_APP_EMAILJS_TEMPLATE_ID === undefined
                || process.env.REACT_APP_EMAILJS_USER_ID === undefined) {
                console.warn("Not variable env found")
                return
            }

            emailJs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                templateParameters,
                process.env.REACT_APP_EMAILJS_USER_ID)
                .then(() => {
                    clearInput()
                    setMessageSent(true)
                })
                .catch(() => setMessageSentError(true))
        }
    }

    return (
        <div className="flex flex-col w-full sm:w-2/3 xl:w-2/5">
            <div className="mt-2">
                <p>Votre nom <span className="text-2xl text-red-600">*</span></p>
                <Input required={ true } onChange={ validName }
                    className={ `capitalize ${ nameValid ? "" : "border-red-600 bg-red-200 focus:border-red-600" }` }/>
            </div>

            <div className="mt-2">
                <p>Votre e-mail <span className="text-2xl text-red-600">*</span></p>
                <Input required={ true } type="email" title={ emailValid ? "" : "Email not valid" }
                    className={ emailValid ? "" : "border-red-600 bg-red-200 focus:border-red-600" }
                    onChange={ validEmail }/>
            </div>

            <div className="mt-2">
                <p>Sujet</p>
                <Input onChange={ setSubject }/>
            </div>

            <div className="flex flex-col mt-2">
                <p>Message</p>
                <label><textarea rows={ 5 } onChange={ ({ target: { value } }) => setMessage(value) }
                    className="border border-gray-300 rounded focus:border focus:outline-none focus:border-test-green px-0.5 mt-1.5 w-full"/></label>
                <div className="flex items-center">
                    <button onClick={ sendEmail }
                        className="px-6 py-1 rounded bg-test-green text-xs font-medium leading-6 text-center text-white shadow hover:shadow-lg hover:bg-test-red
                        focus:outline-none w-min">
                        Envoyer
                    </button>
                    <div
                        className={ `flex w-full ml-5 ${ messageSent ? "text-green-700" : "text-red-500" } font-bold` }>
                        { messageSent && <Notification text={ successMessage }/> }
                        { !messageSent && messageSentError &&
                        <Notification text={ errorMessage }/> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm
