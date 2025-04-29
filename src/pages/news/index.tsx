import { useState } from "react";
import { useGetWallsQuery } from "../../entities/vk-news/api/vkApi";
import { NewsCard } from "../../entities/vk-news/ui";
import style from "./style.module.scss";
import { CircularProgress, Pagination, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { NewsModal } from "./ui/modal";

export const News = () => {
  const [bodyParam, setBodyParam] = useState({
    method: "wall.get",
    params: {
      domain: "ictis_sfedu",
      count: 9,
      v: 5.199,
      access_token: localStorage.getItem("vk_access_token"),
      offset: 1,
    },
  });
  const { data, isLoading } = useGetWallsQuery(
    { ...bodyParam },
    { skip: false, refetchOnMountOrArgChange: true }
  );
  const onChangePagination = (_, page) => {
    setBodyParam((prev) => ({
      ...prev,
      params: { ...prev.params, offset: page * 9 },
    }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const handleOpenModal = (newsItem) => {
    setSelectedNews(newsItem);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNews(null);
  };

  if (isLoading) return <CircularProgress sx={{ margin: "auto" }} />;
  const {
    response: { items, count },
  } = data;
  return (
    <div className={style.center}>
      <div className={style.container}>
        <Typography variant="h4">Актуальные новости</Typography>
        <div className={style.list}>
          {items.length > 0 &&
            items.map((item) => (
              <NewsCard
                key={item.date}
                {...item}
                handleAbout={handleOpenModal}
              />
            ))}
        </div>
        <Pagination
          size="large"
          onChange={onChangePagination}
          count={Math.floor(count / 9)}
        />
        <Modal open={isOpenModal} onClose={() => setOpenModal(false)}>
          <NewsModal
            selectedNews={selectedNews}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  );
};
