// 模拟首页轮播图数据

import Mock from "mockjs";

import FirMidImg from "@/assets/FirMidImg.jpg";
import FirBigImg from "@/assets/FirBigImg.jpg";
import SecMidImg from "@/assets/SecMidImg.jpg";
import SecBigImg from "@/assets/SecBigImg.jpg";
import ThiMidImg from "@/assets/ThiMidImg.jpg";
import ThiBigImg from "@/assets/ThiBigImg.jpg";

Mock.mock("/api/banner", "get", {
  // code: 406,
  // msg: "出错",
  code: 0,
  msg: "",
  data: [
    {
      id: "1",
      midImg: FirMidImg,
      bigImg: FirBigImg,
      title: "凛冬将至",
      description: "人唯有恐惧的时候方能勇敢",
    },
    {
      id: "2",
      midImg: SecMidImg,
      bigImg: SecBigImg,
      title: "血火同源",
      description: "如果我回头，一切都完了",
    },
    {
      id: "3",
      midImg: ThiMidImg,
      bigImg: ThiBigImg,
      title: "听我怒吼",
      description: "兰尼斯特有债必偿",
    },
  ]
})