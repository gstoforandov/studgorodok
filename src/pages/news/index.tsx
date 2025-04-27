import { useEffect } from "react";
import { useGetWallsMutation } from "../../entities/vk-news/api/vkApi";

export const News = () => {
  const [getWalls] = useGetWallsMutation();
  useEffect(() => {
    getWalls({});
  }, []);
  return <div>helloworld</div>;
};
