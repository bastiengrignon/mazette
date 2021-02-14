import React, {useState} from "react"
import Input from "../Input"
import emailJs from "emailjs-com"

const ContactForm: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const templateParameters = {
        fromName: name,
        userEmail: email,
        subject: subject,
        message: message
    }

    const sendEmail = () => {
        if (!!name && !!email) {
            if (process.env.REACT_APP_EMAILJS_SERVICE_ID === undefined
                || process.env.REACT_APP_EMAILJS_TEMPLATE_ID === undefined
                || process.env.REACT_APP_EMAILJS_USER_ID === undefined) {
                return
            }
            emailJs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                templateParameters,
                process.env.REACT_APP_EMAILJS_USER_ID)
                .then(response => {
                    console.log("Success ! ", response.status, response.text)
                }).catch(error => {
                    console.log("Failed ! ", error)
                })
        }
    }

    return (
        <div className="my-5 flex flex-col px-3 w-full sm:w-2/3 xl:w-2/5">
            <div className="mt-2">
                <p>Votre nom <span className="text-2xl text-red-600">*</span></p>
                <label><Input required={true} onChange={setName}
                    className="capitalize"/></label>
            </div>

            <div className="mt-2">
                <p>Votre e-mail <span className="text-2xl text-red-600">*</span></p>
                <label><Input required={true} onChange={setEmail}/></label>
            </div>

            <div className="mt-2">
                <p>Sujet</p>
                <label><Input onChange={setSubject}/></label>
            </div>

            <div className="flex flex-col mt-2">
                <p>Message</p>
                <label><textarea rows={5}
                    onChange={({target: {value}}) => setMessage(value)}
                    className="border border-gray-300 rounded focus:border focus:outline-none focus:border-my-indigo px-0.5 mt-1.5 w-full"/></label>
                <button onClick={sendEmail}
                    className="px-6 py-1 mt-2 rounded bg-my-indigo text-xs font-medium leading-6 text-center text-white shadow hover:shadow-lg hover:bg-yellow-400 hover:text-my-indigo hover:font-bold focus:outline-none w-min">
                    Envoyer
                </button>
            </div>
        </div>
    )
}

export default ContactForm