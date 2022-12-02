import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface ICardControlProps {
  id: number;
  imgPath?: string;
  title: string;
  description: string;
}

const CardControl = ({
  id,
  imgPath,
  title,
  description,
}: ICardControlProps) => {
  return (
    <Card id={id.toString()} sx={{ minWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`${imgPath}`}
        alt="image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardControl;
