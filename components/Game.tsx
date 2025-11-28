import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FlappyBird from "./FlappyBird";
import Footer from "./Footer";
import Background from "./Background";
import useGame from "../hooks/useGame";
import Pipes from "./Pipes";
import useElementSize from "../hooks/useElementSize";
import _ from "lodash";

interface GameProps {
  birdImage?: string;
  pipeImage?: string;
  overlayImage?: string;
}

export default function Game({ birdImage: defaultBirdImage, pipeImage: defaultPipeImage, overlayImage: defaultOverlayImage }: GameProps) {
  const { handleWindowClick, startGame, isReady, rounds } = useGame();
  const [ref, window] = useElementSize();
  const [birdImage, setBirdImage] = useState<string>(defaultBirdImage || '');
  const [pipeImage, setPipeImage] = useState<string>(defaultPipeImage || "pipe.png");
  const [overlayImage, setOverlayImage] = useState<string>(defaultOverlayImage || "aditya.png");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    if (window.width > 0 && window.height > 0) {
      startGame(window);
    }
  }, [window, ref]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.main
      layout
      className="m-auto overflow-hidden flex flex-col max-w-[480px] border-8 border-zinc-200 rounded-xl bg-[#ded895] relative max-h-[800px] w-full h-full"
    >
      <Background />
      
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg font-semibold text-sm transition-all"
      >
        ⚙️ {showSettings ? 'Close' : 'Settings'}
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 z-50 bg-white p-4 rounded-lg shadow-xl max-w-xs">
          <h3 className="font-bold text-lg mb-3">Upload Images</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Bird Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setBirdImage)}
                className="text-xs w-full file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Pipe Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setPipeImage)}
                className="text-xs w-full file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-green-500 file:text-white file:cursor-pointer hover:file:bg-green-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Overlay Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setOverlayImage)}
                className="text-xs w-full file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setBirdImage(defaultBirdImage || "gulla.png");
              setPipeImage(defaultPipeImage || "pipe.png");
              setOverlayImage(defaultOverlayImage || "aditya.png");
            }}
            className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded font-medium text-sm"
          >
            Reset to Defaults
          </button>
        </div>
      )}

      <motion.div
        ref={ref} 
        key={_.last(rounds)?.key || "initial"}
        onTap={handleWindowClick}
        className="h-[calc(100%-7rem)] z-10 flex relative overflow-hidden cursor-pointer"
      >
        {isReady && (
          <>
            <Pipes pipeImage={pipeImage} overlayImage={overlayImage} />
            <FlappyBird birdImage={birdImage} />
          </>
        )}
      </motion.div>
      <Footer />
    </motion.main>
  );
}
