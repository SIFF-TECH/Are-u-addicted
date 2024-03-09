import { Mood, Person, Send } from "@mui/icons-material"
import "./messages.css"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useSelector } from "react-redux";
import { useState } from "react";

const PatientMessages = () => {
    const user = useSelector((state) => state.user.currentUser);
    const queryClient = useQueryClient();
    const [content, setContent] = useState("")

    const { isLoading, data } = useQuery({
        queryKey: ["messages"],
        queryFn: () =>
            newRequest.get('/message').then((res) => {
                return res.data;
            })
    });

    let first_name;
    let last_name

    if (data) {
        first_name = data[0]?.first_name
        last_name = data[0]?.last_name
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setContent(value)
    }

    const mutation = useMutation({
        mutationFn: (message) => {
            return newRequest.post('/message', message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["messages"])
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate({
            content: content
        })
        setContent("")
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="messages-container">
            <div className="header-message">
                <Person sx={{ fontSize: 24 }} />
                <p className="person-name">{first_name} {last_name}</p>
            </div>
            <div className="chat">
                
            {data?.map((message) => (

                <div key={message?.ID_message} className="chat-messages">
                    <div className={message?.ID_user === user?.userInfo?.ID_user ? "chat-messages_item owner" : "chat-messages_item"}>
                        {
                            message?.ID_user !== user?.userInfo?.ID_user &&
                            <img className="chat-messages_item-img" src='https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='' />
                        }
                        <p className="chat-messages_item-desc">
                            {message?.content}
                        </p>
                    </div>
                </div>
            ))}
            </div>
            <div className="footer-messages">
                <div className="footer-messages_left">
                    <Mood sx={{ fontSize: 26, cursor: "pointer" }} />
                    <input type="text" className="write-message" value={content} placeholder="Type your message here" onChange={handleChange}></input>
                </div>
                <Send sx={{ fontSize: 26, cursor: "pointer" }} onClick={handleSubmit}/>
            </div>
        </div>
    )
}

export default PatientMessages