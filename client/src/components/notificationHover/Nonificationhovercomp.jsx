import { useState } from "react";
import "./Notificationhovercomp.css";
import Button from '@mui/material/Button';

import { SnackbarProvider } from 'notistack';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Avatar } from "@mui/material";
const Notificationhovercomp = () => {
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["alerts"],
    queryFn: () =>
      newRequest.get("alert").then((res) => {
        return res.data;
      })
  });

  const mutation = useMutation({
    mutationFn: (id) => {
        return newRequest.put(`/alert/${id}`)
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["alerts"])
    }
});

const handleClick = (event, id) => {
  // event.preventDefault()
    mutation.mutate(id)
}

const handleAccept = (id) => {
    newRequest.post('questionnaire/retest/accept', {ID_user: id}).then((res) => {
      console.log(res.data)
    })
}

  return (
    <div
      className="image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="notification-number">{data?.length}</span>
      <svg className="svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-bell">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
      {isHovered && (
        <div
          className="hover-content-notifi"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          <div className="notifi-box" id="box">
            <h2 className="notification-h2">Notifications   <spans>{data?.length}</spans></h2>
            {data?.map((alert) => (
              <div key={alert?.ID_alert} className="notifi-item" onClick={() => handleClick(event, alert?.ID_alert)}>
                <Avatar   sx={{width: "55px", height:"55px" , marginRight:"10px"}}/>
                <div className="notifi-text">
                  <p className="notifi-h4">{alert?.first_name} {alert?.first_name}</p>
                  <p className="notifi-p">{alert?.content}</p>
                  {alert?.type === "retest" &&
                    <SnackbarProvider sx={{ border: 'solid' }} maxSnack={3}>
                      <div className="notifi-fragment">
                        <Button onClick={() => handleAccept(alert?.ID_sender)}>Accept</Button>
                        <div className="notifi-refuse"><Button >Refuse</Button>
                        </div>
                      </div>
                    </SnackbarProvider>
                  }
                </div>

              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default Notificationhovercomp;