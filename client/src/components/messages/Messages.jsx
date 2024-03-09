import { Mood, Person, Send } from "@mui/icons-material"
import "./messages.css"
import { useLocation, useParams } from "react-router-dom"
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useState } from "react";

const Messages = () => {
    const user = useSelector((state) => state.user.currentUser);
    const queryClient = useQueryClient();
    const [content, setContent] = useState("")
    const id = useParams()?.id;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const patient = queryParams.get('patient');

    const { isLoading, data } = useQuery({
        queryKey: ["messages"],
        queryFn: () =>
            newRequest.get(`message/${id}?patient=${patient}`).then((res) => {
                return res.data;
            })
    });

    let first_name;
    let last_name;


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
            ID_conversation: id,
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
                    <input name="content" type="text" value={content} className="write-message" placeholder="Type your message here" onChange={handleChange}></input>
                </div>
                <Send sx={{ fontSize: 26, cursor: "pointer" }} onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default Messages