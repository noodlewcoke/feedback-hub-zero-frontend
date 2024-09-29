import { useState, useEffect } from "react"


export function TicketConfirmation ({ticketId, message}) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log(message)
        if (message == 200) {
            console.log("message is 200")
            setOpen(true)
        }
    }, [message])
 
    return (
        <div className={`${!open && "hidden"} flex flex-col items-start w-full mx-auto max-w-[1200px] bg-white border-2 border-green-600 rounded-xl shadow-sm p-5 gap-3`}>
            <h1>Ticket created successfully!</h1>
            <h1>Ticket: {ticketId}</h1>
            <a className="underline cursor-pointer" href="/status">Check ticket status.</a>
        </div>
    )
}