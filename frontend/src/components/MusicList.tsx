import { useAuthContext } from "../context/AuthContext";

interface MusicListProps {
    musicList: MusicList[];
    handleGetMusic: (key: string, filename: string, index: number) => void;
    handleNextSong?: () => Promise<void>;
    handlePrevSong?: () => Promise<void>;
    handleCreateOrder: (amount: number) => void;
  }

const MusicList:React.FC<MusicListProps> = ({musicList, handleGetMusic, handleNextSong, handlePrevSong, handleCreateOrder}) => {
    const {isAdmin} = useAuthContext();
    return (
        <div className="flex flex-col items-center row-span-1 col-span-2 xl:row-span-1 xl:col-span-1 bg-[#1a1a1a]  text-white max-h-screen w-full overflow-y-scroll ml-1">
        {musicList.length > 0 ? (
            musicList.map((music, index) => (
                <div className="w-full p-2" key={music.key}>
                    <div className="w-full h-20 p-2 bg-[#3f3e3a] flex justify-between items-center rounded-lg">
                        <div className="h-full flex gap-3 items-center overflow-hidden">
                            <div onClick={() => handleGetMusic(music.key, music.title, index)} className="thumbnail w-16 h-full rounded-md bg-[#ff6f61] cursor-pointer"></div>
                            <div className="leading-5">
                                <p>{music.title}</p>
                                <p className="text-[#b0b0b0]">artist name</p>
                            </div>
                        </div>
                        <div className="h-full flex items-center gap-3">
                          {isAdmin ? (
                            <>
                            </>
                          ): (
                            <button className="w-16 h-10 mr-2 rounded-md bg-[#1a1a1a] text-white text-lg cursor-pointer font-bold transition-all" onClick={() => handleCreateOrder(music.amount)}>₹ {music.amount}</button>
                          )}
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="w-full p-2">
                <div className="w-full h-20 p-2 flex justify-between items-center">
                    <p className="text-center">No music uploaded</p>
                </div>
            </div>
        )}
    </div>
    )
}

export default MusicList;