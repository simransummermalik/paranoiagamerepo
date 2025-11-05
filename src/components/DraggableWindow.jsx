import { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";

// simple z-index manager so the clicked window comes to front
let zSeed = 10;
const nextZ = () => ++zSeed;

export default function DraggableWindow({
  id,                 // unique: "terminal", "vscode", "browser"
  title,              // header title text
  children,
  defaultPos = { x: 60, y: 60 },
  width = 640,
  height = 420,
  onClose,            // optional
}) {
  const nodeRef = useRef(null);
  const [z, setZ] = useState(nextZ());
  const storageKey = useMemo(() => `pn_window_pos_${id}`, [id]);
  const [pos, setPos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return saved ?? defaultPos;
    } catch {
      return defaultPos;
    }
  });

  // keep position persisted
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(pos));
  }, [pos, storageKey]);

  const onStart = () => setZ(nextZ());
  const onStop = (_, data) => setPos({ x: data.x, y: data.y });

  return (
    <Draggable
      handle=".pn-window__titlebar"
      nodeRef={nodeRef}
      bounds="parent"
      defaultPosition={pos}
      onStart={onStart}
      onStop={onStop}
    >
      <div
        ref={nodeRef}
        onMouseDown={() => setZ(nextZ())}
        style={{
          position: "absolute",
          width,
          height,
          zIndex: z,
          boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(18,18,20,0.9)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
          userSelect: "none",
        }}
      >
        <div
          className="pn-window__titlebar"
          style={{
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            fontSize: 14,
            letterSpacing: 0.2,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            cursor: "grab",
          }}
          // improve touch drag feel
          onPointerDown={e => { e.currentTarget.style.cursor = "grabbing"; }}
          onPointerUp={e => { e.currentTarget.style.cursor = "grab"; }}
        >
          <span style={{ opacity: 0.85 }}>{title}</span>
          {onClose && (
            <button
              onClick={onClose}
              aria-label={`Close ${title}`}
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
              }}
            />
          )}
        </div>

        <div style={{ width: "100%", height: `calc(100% - 40px)`, overflow: "auto" }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
}
