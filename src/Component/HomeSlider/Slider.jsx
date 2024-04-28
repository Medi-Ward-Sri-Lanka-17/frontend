import React, { useEffect, useState } from "react";
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
//import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./Sli.css";
import LowerSlider from "./LowerSlider";
import Post from "./Post";
import { useAuth } from "../../Security/AuthContext";
import { retrieveNews } from "../../Services/Home/retriveNews";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Slider() {
  const authContext = useAuth();
  const nic = authContext.nic;

  let data = [];

  const [news, setNews] = useState([]);

  useEffect(() => {
    refreshNews(nic);
  }, []);

  async function refreshNews(nic) {
    const response = await retrieveNews(nic);
    if (response && response.length > 0) {
      setNews(response);
    } else {
      console.log("Empty response received");
    }
  }

  useEffect(() => {
    console.log(news);
    console.log(news.map((item) => item.newsHeader));
    //console.log(news.map(item => item.newsDescription)); // Example of accessing data
  }, [news]);

  Array.from({ length: 7 }).forEach((_, i) => {
    data.push(i);
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const slideLeft = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const slideRight = () => {
    setActiveSlide((prev) =>
      prev < news.length - 1 ? prev + 1 : news.length - 1
    );
  };

  const [isLow, setIsLow] = useState(false);

  return (
    <div className="slider-container">
      <div className="inner-container">
        <div className="slider">
          <button onClick={slideLeft}>
            <ArrowBackIosIcon style={{ background: "transparent" }} />
          </button>
          {news.map((item) => (
            <div
              className={`slide ${news[activeSlide] === item ? "active" : ""}`}
            >
              <Post item={item} isLow={isLow} />
            </div>
          ))}
          <button onClick={slideRight}>
            <ArrowForwardIosIcon style={{ background: "transparent" }} />
          </button>
        </div>
        {/* <div className='x'>
                <LowerSlider news={news} setActiveSlide={setActiveSlide} />
            </div> */}
      </div>
    </div>
  );
}

export default Slider;
