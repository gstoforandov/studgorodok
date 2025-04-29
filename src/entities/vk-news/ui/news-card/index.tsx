import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { PostText } from "./utils";
import emptyImg from "../../../../assets/emptyNewPic.jpg";
export const NewsCard = (props: any) => {
  const { handleAbout } = props;
  return (
    <Card sx={{ maxWidth: 490 }}>
      {renderCardMedia()}
      <CardContent>{renderText()}</CardContent>
      <CardActions>
        <Button size="small">Поделиться</Button>
        <Button size="small" onClick={() => handleAbout(props)}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );

  function renderText() {
    if (!props.text) return "";
    const { text } = props;
    return <PostText text={text} />;
  }

  function renderCardMedia() {
    if (!props.attachments) return null;
    const { photo } = props.attachments[0];
    if (!photo)
      return (
        <CardMedia
          component="img"
          //* @TODO
          alt="green iguana"
          height="310"
          image={emptyImg}
          sx={{ objectFit: "cover" }}
        />
      );
    const { sizes } = photo;
    const rightSize = sizes.find((el) => el.type === "r");

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
/*

{
    "inner_type": "wall_wallpost",
    "donut": {
        "is_donut": false
    },
    "is_pinned": 1,
    "comments": {
        "count": 0
    },
    "marked_as_ads": 0,
    "hash": "HxE-7P7YUDg89Huf7g",
    "type": "post",
    "push_subscription": {
        "is_subscribed": false
    },
    "attachments": [
        {
            "type": "photo",
            "photo": {
                "album_id": -7,
                "date": 1745358825,
                "id": 457263108,
                "owner_id": -48632629,
                "access_key": "01567d9123335f70a6",
                "post_id": 12239,
                "sizes": [
                    {
                        "height": 75,
                        "type": "s",
                        "width": 75,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=75x75"
                    },
                    {
                        "height": 130,
                        "type": "m",
                        "width": 130,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=130x130"
                    },
                    {
                        "height": 604,
                        "type": "x",
                        "width": 604,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=604x604"
                    },
                    {
                        "height": 807,
                        "type": "y",
                        "width": 807,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=807x807"
                    },
                    {
                        "height": 1280,
                        "type": "z",
                        "width": 1280,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=1280x1280"
                    },
                    {
                        "height": 2560,
                        "type": "w",
                        "width": 2560,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=2560x2560"
                    },
                    {
                        "height": 130,
                        "type": "o",
                        "width": 130,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=130x130"
                    },
                    {
                        "height": 200,
                        "type": "p",
                        "width": 200,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=200x200"
                    },
                    {
                        "height": 320,
                        "type": "q",
                        "width": 320,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=320x320"
                    },
                    {
                        "height": 510,
                        "type": "r",
                        "width": 510,
                        "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&cs=510x510"
                    }
                ],
                "text": "",
                "user_id": 100,
                "web_view_token": "7265bedf656d12fb88",
                "has_tags": false,
                "orig_photo": {
                    "height": 2560,
                    "type": "base",
                    "url": "https://sun2-20.userapi.com/s/v1/ig2/CY6TBf8FqILrOrxGNPSnEAW1MM6ZQOFgDuQss7llX7DcnBzPK3VSnLNLy8Li88lJn90s43aOj43eyhDaAbgwEZ_H.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu",
                    "width": 2560
                }
            }
        }
    ],
    "date": 1745391780,
    "from_id": -48632629,
    "id": 12239,
    "likes": {
        "can_like": 0,
        "count": 17,
        "user_likes": 0
    },
    "reaction_set_id": "reactions",
    "reactions": {
        "count": 17,
        "items": [
            {
                "id": 0,
                "count": 17
            }
        ]
    },
    "owner_id": -48632629,
    "post_type": "post",
    "reposts": {
        "count": 16
    },
    "text": "}1 IT-магистратура в ЮФУ: твой билет в будущее!\n\nХочешь стать востребованным IT-специалистом? Институт компьютерных технологий и информационной безопасности [club47535294|ЮФУ] – в числе лучших в России по подготовке IT-специалистов – приглашает для обучения в магистратуру! \n\n🚀 Почему стоит выбрать ИКТИБ ЮФУ? \n✅ ЮФУ входит в ТОП университетов страны по подготовке IT-специалистов\n✅ Программы соответствуют современным IT-отрасли\n✅ Преподаватели-эксперты и сильная научная база \n✅ Возможности для стажировок и трудоустройства во время обучения\n\n📅 Конкурс портфолио проводиться до 20 июня 2025 года\n\n📌 3 простых шага для участия: \n1⃣ Зарегистрируйся на http://master.sfedu.ru\n2⃣ Собери портфолио по выбранному направлению https://vk.cc/cL2r90 \n3⃣ Пройди собеседование\n\n📂 Что включить в портфолио? \n✉ Мотивационное письмо – расскажи о своих целях \n💡 Тематические кейсы – можно предоставить: \n - свою дипломную работу \n - эссе по темам магистерской программы \n📚 Учебные достижения – грамоты, сертификаты, проекты \n👨‍💻 Опыт научной, исследовательской и профессиональной деятельности – публикации, стажировки, практика \n\n⚡ Важная информация: \n✔ Можно подать заявки на несколько направлений \n✔ Максимальный балл – 100\n✔ 50+ баллов за портфолио можно использовать качестве результата вступительного испытания! \n\n🎓 Не упусти возможность! \nПолучи качественное IT-образование в одном из лучших вузов страны. \n\n🔗 Подать заявку: master.sfedu.ru\n⏰ Прием до 20 июня 2025 \n\nОстались вопросы - обращайтесь к Руководителю центра по продвижению образовательных программ ИКТИБ Шайлиеву Марату Баталбиевичу по телефону +7 929 801 72 09 или mshayliev@sfedu.ru\n\n#ЮФУ #ИКТИБ #новости",
    "views": {
        "count": 1508
    }
}

*/
