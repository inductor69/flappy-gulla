import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";

interface BirdProps {
  birdImage?: string;
}

export function Bird({ birdImage = "gulla.png" }: BirdProps) {
  const {
    bird: {
      size: { height, width },
      frame,
      isFlying,
      flap: { delay },
    },
    getNextFrame,
  } = useGame();
  // useInterval(() => getNextFrame(), isFlying ? delay : null);
  return (
    <div
      style={{
        backgroundImage: `url(${birdImage})`,
        height,
        width,
        backgroundPosition: "center",
        backgroundSize: "cover",
        zIndex: 100,
      }}
    />
  );
}
export default function FlappyBird({ birdImage }: BirdProps) {
  const {
    isStarted,
    bird: {
      fall: { delay },
      position,
      animate,
    },
    fall,
  } = useGame();
  useInterval(() => fall(), isStarted ? delay : null);
  return (
    <motion.div
      className={`m-auto absolute z-40 ${
        !isStarted && "animate-pulse"
      } w-20 h-10`}
      style={{
        ...position,
      }}
      animate={{
        ...position,
        ...animate,
      }}
      transition={{
        ease: "linear",
        duration: 0.25,
      }}
    >
      <Bird birdImage={birdImage} />
    </motion.div>
  );
}
