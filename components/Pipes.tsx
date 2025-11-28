import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";

interface PipesProps {
  pipeImage?: string;
  overlayImage?: string;
}

export default function Pipes({ pipeImage, overlayImage }: PipesProps) {
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
            children={<Pipe pipeImage={pipeImage} overlayImage={overlayImage} />}
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
            children={<Pipe pipeImage={pipeImage} overlayImage={overlayImage} />}
            transition={{
              ease: "linear",
            }}
          />
        </>
      ))}
    </>
  );
}
export function Pipe({ pipeImage = "pipe.png", overlayImage = "aditya.png" }: PipesProps) {
  return (
    <div className="relative h-full w-full">
      <img src={pipeImage} className="h-full w-full pointer-events-none" alt="" />
      <img 
        src={overlayImage} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-10" 
        alt="" 
      />
    </div>
  );
}
