import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PostText } from "./utils";
import emptyImg from "../../../../assets/emptyNewPic.jpg";

interface PhotoSize {
  type: string;
  url: string;
  width: number;
  height: number;
}

interface Photo {
  album_id: number;
  date: number;
  id: number;
  owner_id: number;
  access_key: string;
  post_id?: number; 
  sizes: PhotoSize[];
  text: string;
  user_id?: number; 
  web_view_token?: string;
  has_tags: boolean;
  orig_photo?: PhotoSize; 
}

interface Attachment {
  type: string;
  photo?: Photo;
}

export interface NewsCardProps {
  id: number;
  text?: string;
  attachments?: Attachment[];
  handleAbout: (props: NewsCardProps) => void;
  date?: number;
  likes?: { count: number };
  reposts?: { count: number };
  views?: { count: number };
  owner_id?: number;
  from_id?: number;
}

export const NewsCard = (props: NewsCardProps) => {
  const { handleAbout, text, attachments } = props;
  return (
    <Card sx={{ maxWidth: 490, margin: 2, boxShadow: 3, borderRadius: 2 }}>
      {renderCardMedia()}
      <CardContent>
        {renderText()}
        {renderMetaInfo()}
      </CardContent>
      <CardActions>
        <Button size="small">Поделиться</Button>
        <Button size="small" onClick={() => handleAbout(props)}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );

  function renderText() {
    if (!text) return null;
    return (
      <Typography variant="body2" color="text.secondary" component="div">
        <PostText text={text} />
      </Typography>
    );
  }

  function renderCardMedia() {
    if (!attachments || attachments.length === 0 || !attachments[0]?.photo) {
      return (
        <CardMedia
          component="img"
          alt=" Новостное изображение отсутствует"
          height="310"
          image={emptyImg}
          sx={{ objectFit: "cover" }}
        />
      );
    }
    const { photo } = attachments[0];
    const { sizes } = photo;
    const rightSize = sizes.find((el: PhotoSize) => el.type === "r");

    return (
      <CardMedia
        component="img"
        alt={photo.text || `Новость ${props.id}`}
        height="310"
        image={rightSize ? rightSize.url : emptyImg}
        sx={{ objectFit: "cover" }}
      />
    );
  }

  function renderMetaInfo() {
    const { date, likes, reposts, views } = props;
    return (
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {date && `Дата: ${new Date(date * 1000).toLocaleDateString()} | `}
        {likes && `Лайки: ${likes.count} | `}
        {reposts && `Репосты: ${reposts.count} | `}
        {views && `Просмотры: ${views.count}`}
      </Typography>
    );
  }
};
