import { useNavigate } from "react-router-dom"
import "./conversations.css"
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Conversations = () => {
    const navigate = useNavigate()

    const { isLoading, data } = useQuery({
        queryKey: ["conversations"],
        queryFn: () =>
          newRequest.get("/conversation").then((res) => {
            return res.data;
          })
      });



    const handleClick = (id, patientID) => {
        navigate(`/profile/messages/${id}?patient=${patientID}`)
    }
    if (isLoading) {
        return <div>loading...</div>
    }
    if(data.length === 0) {
        return <div style={{margin: "auto", display: "flex", alignItems: "center" , height: "83vh" }}>You don&apos;t have any conversation</div>
    }
    
    return (
        <div className="conversations-container">
        { data.map((conversation) => (
            <div key={conversation?.ID_converation} className="conversations-discussion" onClick={ () => handleClick(conversation?.ID_converation, conversation?.ID_patient)}>
                <div className="conversations-photo" style={{ backgroundImage: `url("https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600")` }}>
                </div>
                <div className="conversations-desc-contact">
                    <p className="conversations-name">{conversation?.first_name} {conversation?.last_name}</p>
                    <p className="conversations-message">{conversation?.last_message}</p>
                </div>
            </div>
        ))}
        </div>
    )
}

export default Conversations 