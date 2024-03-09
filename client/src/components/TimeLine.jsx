import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

export default function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          9:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{height:'25px'}} />
          <TimelineDot>
            <EventNoteIcon/>
          </TimelineDot>
          <TimelineConnector  sx={{height :'30px'}} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Today Seesion
          </Typography>
        
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector  sx={{height :'30px'}}/>
          <TimelineDot color="primary">
            <EventAvailableIcon/>
          </TimelineDot>
          <TimelineConnector sx={{height :'30px'}}/>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Session End
          </Typography>
       
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          12/12/2025
        </TimelineOppositeContent>
        <TimelineSeparator >
            
          <TimelineConnector sx={{height :'30px'}}/>
          
          <TimelineDot color="primary" variant="outlined">
            <AssignmentIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main', height:'30px' }} />
        </TimelineSeparator>
        
        <TimelineContent sx={{ py: '12px', px: 2 }}>
            
          <Typography variant="h6" component="span">
            Next Test
          </Typography>
          
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          12/12/2025
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main', height:'30px'}} />
          <TimelineDot color="secondary">
            <DocumentScannerIcon />
          </TimelineDot>
          <TimelineConnector  sx={{height:'30px'}}/>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Depestage
          </Typography>
          
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}