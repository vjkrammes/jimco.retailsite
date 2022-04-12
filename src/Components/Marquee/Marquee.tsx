import { randomFromInterval, GenerateLoremIpsum } from "../../Services/tools";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import "./Marquee.css";

export default function Marquee() {
  const [color, setColor] = useState("#ffccbb");
  const [scrolling, setScrolling] = useState(true);
  const [animatedClass, setAnimatedClass] = useState("animated");
  const [words, setWords] = useState(GenerateLoremIpsum(10, 15, 2, 2, 1));
  useEffect(() => {
    const colors = [
      "#ffccbb", // light salmon
      "lightgreen",
      "lightblue",
      "#ffec8b", // light goldenrod
      "#b19cd9", // lavender
      "#00ffff", // cyan
      "#7fffd4", // aquamarine
      "#dda0dd", // plum
    ];
    const interval = setInterval(() => {
      setWords(GenerateLoremIpsum(10, 15, 1, 2, 1));
      const oldcolor = color;
      var newcolor = colors[randomFromInterval(0, colors.length - 1)];
      while (oldcolor === newcolor) {
        newcolor = colors[randomFromInterval(0, colors.length - 1)];
      }
      setColor(newcolor);
    }, 15000);
    if (prefersReducedMotion()) {
      setScrolling(false);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function prefersReducedMotion() {
    var media = window.matchMedia("(prefers-reduced-motion: reduce)");
    return media && media.matches;
  }
  function stopScrolling() {
    setScrolling(false);
    setAnimatedClass("");
  }
  return (
    <div className="marquee">
      <img
        className="marqueeimage"
        src="images/news-bw-512.png"
        alt="news for you"
        title="News for You"
      />
      <div
        className="scroll-left"
        id="marquee"
        style={{ backgroundColor: color }}>
        <p className={animatedClass}>{words}</p>
      </div>
      {scrolling && (
        <button
          className="scrollbutton"
          onClick={stopScrolling}
          title="Stop Animations">
          <MdCancel />
        </button>
      )}
    </div>
  );
}
