import { createEffect, createSignal, on } from "solid-js";
import { createSpring } from "spring-solid";
import "./draggable.css";

export default function Page() {
  // Actual Value.
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [isDragging, setIsDragging] = createSignal(false);

  function draggable(node: HTMLDivElement) {
    let startX: number;
    let startY: number;

    node.onmousedown = (e) => {
      setIsDragging(true);
      startX = e.clientX;
      startY = e.clientY;
    };

    window.onmouseup = () => {
      setIsDragging(false);
    };

    window.onmousemove = (e) => {
      if (isDragging()) {
        setX((_x) => _x + e.clientX - startX);
        setY((_y) => _y + e.clientY - startY);
        startX = e.clientX;
        startY = e.clientY;
      }
    };
  }

  // Springed Value.
  const [xy, setXY] = createSpring({ x: 0, y: 0 });
  createEffect(
    on([x, y], () => {
      setXY({ x: x(), y: y() });
    })
  );

  return (
    <div
      // @ts-ignore
      use:draggable={draggable}
      style={{
        transform: `translate(${xy().x}px, ${xy().y}px)`,
      }}
      class="draggable"
    >
      X: {x()} Y: {y()}
    </div>
  );
}

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count()}
    </button>
  );
}
