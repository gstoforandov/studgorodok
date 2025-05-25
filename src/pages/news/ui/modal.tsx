import { Typography, Box, IconButton, Divider, CardMedia } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PostText } from "../../../entities/vk-news/ui/news-card/utils";

interface AttachmentSize {
  type: string;
  url: string;
}

interface Photo {
  sizes: AttachmentSize[];
}

interface Attachment {
  photo?: Photo;
}

export interface NewsItem {
  text?: string;
  attachments?: Attachment[];
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  overflowY: "auto",
};
export const NewsModal = ({
  handleCloseModal,
  selectedNews,
}: {
  handleCloseModal: () => void;
  selectedNews: NewsItem | null;
}) => {
  console.log(selectedNews?.text);
  return (
    <Box sx={modalStyle}>
      <IconButton
        onClick={handleCloseModal}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      {selectedNews && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            {selectedNews.text?.split("\n")[0] || "Новость"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <PostText text={selectedNews.text} isLimited={false} />
          {selectedNews.attachments && selectedNews.attachments.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Вложения:
              </Typography>
              {renderCardMedia()}
            </Box>
          )}
        </>
      )}
    </Box>
  );

  function renderCardMedia() {
    if (!selectedNews?.attachments) return null;
    const firstAttachment = selectedNews.attachments[0];
    if (!firstAttachment?.photo) return null;

    const { photo } = firstAttachment;
    if (!photo) return null;
    const { sizes } = photo;
    const rightSize = sizes.find((el: AttachmentSize) => el.type === "r");

    if (!rightSize) return null; // Handle case where 'r' size is not found

    return (
      <CardMedia
        component="img"
        //* @TODO
        alt="green iguana"
        height="310"
        image={rightSize.url}
        sx={{ objectFit: "cover" }}
      />
    );
  }
};
