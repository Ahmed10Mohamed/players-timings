import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Player({name,time,imgLink}) {
    const safeTime = typeof time === "string" ? time : "--:--";
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imgLink}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h1" sx={{ color: 'text.secondary' }}>
            {safeTime}
        </Typography>
      </CardContent>
    
    </Card>
  );
}
