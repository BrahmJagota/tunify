import { useEffect, useState, useRef } from "react"
import useSound from "use-sound"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

interface SongFile {
    filename: string;
    filepath: string;
    artist: string;
    playNext?: () => Promise<void>;
    playPrev?: () => Promise<void>;
}

export default function MusicPlayer({filename, filepath, artist, playNext, playPrev}: SongFile) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [play, {duration, pause, sound}] = useSound(filepath);
    const audioRef = useRef<HTMLAudioElement>(null);
    const handlePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };
    useEffect(()=> {
      setIsPlaying(false);
    },[playNext, playPrev])
    return (
            <div className="max-w-screen w-full  sm:w-full rounded-lg bg-[#3f3e3a] text-white h-16 flex sm:h-full xl:flex sm:flex-col sm:justify-around items-center gap-2 overflow-hidden">
              <h2 className="text-xl font-bold mt-4 mb-20 hidden sm:block">Now Playing</h2>
                <div className="thumbnail bg-blue-400 h-12 w-12 sm:w-4/5 sm:h-2/5 rounded-lg">
                    
                </div>

                <div className="flex-1 sm:w-full text-center">
                    <h3>{filename}</h3>
                    <p>{artist}</p>
                </div>

                <div className="flex gap-3">
        <button className="playButton" onClick={playPrev}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton outline-none" onClick={handlePlay}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={handlePlay}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton" onClick={playNext}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
      <audio ref={audioRef} src={filepath} onEnded={handleEnded}/>
            </div>



          )
}