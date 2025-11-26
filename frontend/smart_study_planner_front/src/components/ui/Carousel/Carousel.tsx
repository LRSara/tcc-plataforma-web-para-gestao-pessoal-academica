import { Carousel } from "react-bootstrap";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./Carousel.css";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const d = new Date();
  const dia = d.getDate();
  const mes = d.getMonth() + 1; // meses vão de 0 a 11
  const ano = d.getFullYear();
  const diaSemana = d.toLocaleDateString("pt-BR", {
    weekday: "long"
  });
  const dayOfWeek = diaSemana.replace(/^./, diaSemana[0].toUpperCase());

  const month = d.toLocaleDateString("pt-BR", {
    month: "long"
  });

  const slides = [
    {
      text: ` ${dayOfWeek}, ${dia} de ${month}.`,
      bg: "#ff914d",
      date: false,
    },
    { text: `${dia}.${mes}.${ano}`, date: true, bg: "#ff914d" },
    {
      text: "Organize-se para a próxima semana, você está mandando bem!",
      bg: "#ff914d",
      data: false,
    },
  ];

  return (
    <div className="homecarousel-wrapper">
      <Carousel
        activeIndex={index}
        onSelect={setIndex}
        interval={5000}
        slide
        indicators
        controls
        className="custom-carousel homecarousel-carousel"
      >
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="homecarousel-card"
              style={{ backgroundColor: slide.bg }}
            >
              {!slide.date ? (
                <>
                  {/* <p className="homecarousel-text">{slide.text}</p> */}
                  <div className="homecarousel-dateWrap">
                    {/* <FaCalendarAlt className="homecarousel-icon" /> */}
                    <span className="homecarousel-text">{slide.text}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="homecarousel-dateWrap">
                    <FaCalendarAlt className="homecarousel-icon-slide" />
                    <span className="homecarousel-dateText-slide">{slide.text}</span>
                  </div>
                </>
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
