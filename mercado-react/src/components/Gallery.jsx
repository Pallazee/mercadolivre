import { useState, useRef } from "react";

const LENS = 150;
const ZOOM = 2;
const DELAY = 150;

export default function Gallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);
  const timerRef = useRef(null);

  const isTouch =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  function handleEnter() {
    if (isTouch) return;
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, DELAY);
  }

  function handleLeave() {
    clearTimeout(timerRef.current);
    setVisible(false);
  }

  function handleMove(e) {
    if (!visible) return;

    const rect = imgRef.current.getBoundingClientRect();
    const half = LENS / 2;

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x = Math.max(half, Math.min(x, rect.width - half));
    y = Math.max(half, Math.min(y, rect.height - half));

    setPos({ x, y });
  }

  return (
    <div className="gallery-wrapper">
      {/* THUMBNAILS */}
      <div className="gallery-thumbs">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`thumb ${img === activeImage ? "active" : ""}`}
            onClick={() => setActiveImage(img)}
            alt=""
          />
        ))}
      </div>

      {/* IMAGEM */}
      <div
        className="gallery-main"
        ref={imgRef}
        style={{ backgroundImage: `url(${activeImage})` }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
      >
        {visible && (
          <div
            className="zoom-lens"
            style={{
              left: pos.x - LENS / 2,
              top: pos.y - LENS / 2
            }}
          />
        )}
      </div>

      {/* ZOOM */}
      {visible && (
        <div
          className="zoom-result-fixed"
          style={{
            backgroundImage: `url(${activeImage})`,
            backgroundPosition: `-${(pos.x * ZOOM) - 240}px -${(pos.y * ZOOM) - 240}px`
          }}
        />
      )}
    </div>
  );
}
