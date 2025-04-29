import { Typography, Box } from "@mui/material";
import { Link } from "react-router";
interface PostTextProps {
  text?: string;
  isLimited?: boolean;
}
export const PostText: React.FC<PostTextProps> = ({
  text,
  isLimited = true,
}) => {
  if (!text) return null;

  // Функция для обработки VK-разметки [id123|Name] или [club123|Name]
  const parseVkMentions = (text: string) => {
    return text.replace(
      /\[(id\d+|club\d+)\|([^\]]+)\]/g,
      (match, id, name) => `[${name}](https://vk.com/${id})`
    );
  };

  // Функция для преобразования ссылок в кликабельные
  const parseLinks = (text: string) => {
    const parts = text.split(
      /(\[.*?\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s]+)/g
    );

    return parts.map((part, i) => {
      // Обработка markdown-подобных ссылок [text](url)
      const mdLinkMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
      if (mdLinkMatch) {
        return (
          <Link
            key={i}
            href={mdLinkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {mdLinkMatch[1]}
          </Link>
        );
      }

      // Обработка простых URL
      if (part.match(/^https?:\/\//)) {
        return (
          <Link key={i} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </Link>
        );
      }

      return part;
    });
  };

  // Основная функция рендеринга текста
  const renderFormattedText = () => {
    // Сначала обрабатываем VK-разметку
    const withVkLinks = parseVkMentions(text);

    // Разбиваем на параграфы по переносам строк
    return withVkLinks.split("\n").map((paragraph, index) => (
      <Typography
        key={index}
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: paragraph.trim() ? 1 : 0.5,
          whiteSpace: "pre-line",
        }}
      >
        {parseLinks(paragraph)}
      </Typography>
    ));
  };
  const limited = isLimited
    ? {
        display: "-webkit-box",
        WebkitLineClamp: 10,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }
    : {};
  return (
    <Box
      sx={{
        overflowWrap: "break-word",
        ...limited,
      }}
    >
      {renderFormattedText()}
    </Box>
  );
};
