import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";

export default function Pipes() {
  const {
    isStarted,
    pipe: { delay },
    pipes: pipesArray,
    movePipes,
  } = useGame();
  useInterval(() => movePipes(), isStarted ? delay : null);
  return (
    <>
      {pipesArray.map((pipes, index) => (
        <>
          <motion.div
            key={pipes.top.key}
            initial={pipes.top.initial}
            animate={pipes.top.position}
            style={{
              ...pipes.top.size,
              rotate: 180,
            }}
            className="absolute"
            children={<Pipe />}
            transition={{
              ease: "linear",
            }}
          />
          <motion.div
            key={pipes.bottom.key}
            initial={pipes.bottom.initial}
            animate={pipes.bottom.position}
            style={pipes.bottom.size}
            className="absolute"
            children={<Pipe />}
            transition={{
              ease: "linear",
            }}
          />
        </>
      ))}
    </>
  );
}
export function Pipe() {
  return (
    <div className="relative h-full w-full">
      <img src="pipe.png" className="h-full w-full pointer-events-none" alt="" />
      <img 
        src="aditya.png" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-10" 
        alt="" 
      />
    </div>
  );
}
