import React, {useState} from "react"
import Input from "../Input"

const ContactForm: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const sendEmail = () => {
        console.log("Send email")
        if (!!name && !!email) {
            console.log("name: ", name, "\temail: ", email, "\nsubject: ", subject, "\nmessage: ", message)
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