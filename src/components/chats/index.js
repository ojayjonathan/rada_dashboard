import React from 'react'
import Card from '../card'
import img from "../../assets/images/image 3.png"
import "./index.css"

function ChatItem({ item }) {
    return (
        <div className="mb-1 chat-card d-flex justify-content-between align-items-center">
            <div className="profile-thumbnail mb-4" >
                <img className="rounded-circle" src={item.profile} alt="user profile" />
            </div>
            <div className="flex-grow-1">
                <h6 className="my-0">{item.name}</h6>
                <small className="text-muted">{item.message}</small>
                <div className="mt-2 d-flex justify-content-between align-items-center">
                    <div>
                        <span className="material-icons">
                            reply
                        </span>
                        <span className="material-icons  mx-3">
                            {item.read ? "mark_email_read" : "markunread"}
                        </span>
                    </div>
                    <small className="text-muted me-1">{item.date}</small>
                </div>
                <hr />
            </div>
        </div>

    )
}




function Chats() {
    const chat = {
        profile: img,
        message: "Well, the way they make shows is, they make one show ",
        name: "Brian Omondi",
        date: "12/12/21",
        read: true
    }
    return (
        <Card title="Chats">
            <div className="chat-items">
                <ChatItem item={chat} />
                <ChatItem item={chat} />
                <ChatItem item={chat} />

            </div>
        </Card>
    )
}

export default Chats
