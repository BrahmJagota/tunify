import axios from "axios";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import MusicPlayer from "../components/MusicPlayer";
import { RenderRazorpay } from "../components/DisplayRazorpay";
import { useRazorpayContext } from "../context/RazorpayContext";
import Dropdown from "../components/Dropdown";
import { useAuthContext } from "../context/AuthContext";
import { handleDownload } from "../components/DownloadButton";
interface MusicList {
  id: string;
  title: string;
  musicKey: string;
  thumbnailKey: string;
  amount: number;

}

interface CurrentMusicInterface {
  filepath: string;
  filename: string;
  artist: string;
  index: number;
}
interface DownloadMusicInterface {
  filePath: string;
  filename: string;
}
export function Music() {
  const [musicList, setMusicList] = useState<MusicList[]>([]);
  const [toPurchase, setToPurchase] = useState<string>('');
  const [PurchasedMusic, setPurchasedMusic] = useState<MusicList[]>([])
  const [isPurchased, setIsPurchased] = useState<Boolean>(false);
  const [musicToDownload, setMusicToDownload] = useState<DownloadMusicInterface>({
    filePath: '',
    filename: '',
  })
  const [currentMusic, setCurrentMusic] = useState<CurrentMusicInterface>({
    filepath: "",
    filename: "",
    artist: "admin" ,
    index: -1
 });
  const [isHovered, setIsHovered] = useState(false);
  const {isAdmin} = useAuthContext();
  // const [isAdmin, setIsAdmin] = useState(false)
  const {displayRazorpay, setDisplayRazorpay} = useRazorpayContext();
  const [orderDetails, setOrderDetails] = useState<OrderInterface>({
        orderId: '',
        amount: 0
    })

    const handleCreateOrder =async (amount: number, musicId: string) => {
      const data: OrderInterface2 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-order`, {
        amount: amount*100,
        currency: "INR",
        keyId: import.meta.env.VITE_RAZORPAY_ID,
        keySecre: import.meta.env.VITE_RAZORPAY_SECRET, 
        
      });
      if(data && data.data.orderId){
            setOrderDetails({
              orderId: data.data.orderId,
              amount: data.data.amount,
              });
              setToPurchase(musicId);
              setDisplayRazorpay(true);
        }
    }


  const handleGetMusic =async (key: string, filename: string, index: number):Promise<void>=> {
   return axios.post(`${import.meta.env.VITE_BACKEND_URL}/get-object`, {key})
    .then(response => {
      setCurrentMusic((prev) => ({
        ...prev,
        filepath: response.data,
        filename: filename,
        index
      }));
    })
    .catch(err => console.error("error while fetching music:", err));
  }

  const handleDownloadFile = async (key: string, filename: string) => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/get-object`, {key})
    .then(response => {
      handleDownload(response.data, filename);
    })
    .catch(err => console.error("error while fetching music:", err));
  }

  const handleNextSong =async (): Promise<void>=> {
    if(currentMusic.index !== -1 && currentMusic.index < musicList.length - 1){
      const nextSong: MusicList = musicList[currentMusic.index + 1];
    await handleGetMusic(nextSong.musicKey, nextSong.title, currentMusic.index + 1);
    }
  }

  const handlePrevSong = async(): Promise<void> => {
    if(currentMusic.index !== -1 && currentMusic.index > 0){
      const prevSnog:MusicList = musicList[currentMusic.index - 1];
      await  handleGetMusic(prevSnog.musicKey, prevSnog.title, currentMusic.index - 1)
    }
  }
  
  const isMusicPurchased = (musicId: string) => {
    return PurchasedMusic.some((item) => item.id === musicId);
};

// list all music and purchased music
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/list-music`)
      .then((response) => {

        const transformedData: MusicList[] = response.data.map((music: any) => ({
          id: music._id,
          title: music.title,
          musicKey: music.musicKey,
          thumbnailKey: music.thumbnailKey,
          amount: music.amount || 0, // Default to 0 if amount is not provided
        }));
        setMusicList(transformedData);
      })
      .catch((err) => console.error(err));
      
      const getPurchasedMusic = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-purchased-music`, {withCredentials: true})
          const result  =  res.data;
          if(result) {
            const transformedData: MusicList[] = result.map((music: any) => ({
              id: music.musicId,
              title: music.title,
              key: music.key,
              amount: music.amount || 0, // Default to 0 if amount is not provided
            }));
              setPurchasedMusic(transformedData);
              return true;
          } else {
              return false;
          }
      } catch (err) {
          return false;
        }
      }
      getPurchasedMusic();
  }, []);
  return (    
    <>
    <div className="grid grid-cols-[75vw_25vw] grid-rows-[7vh_93vh] max-h-screen  max-w-screen bg-[#1a1a1a] relative">
      <div className=" font-bold text-[clamp(1.5rem,5vw,2rem)] flex flex-wrap justify-center max-h-[7vh]  text-white text-center mt-2 row-span-1 col-span-2">
        <h1 className="text-sm md:text-lg lg:text-xl xl:text-2xl  2xl:text-3xl">Discover & Download the Hottest Beats!</h1>
        <div className="absolute right-4 cursor-pointer"  onClick={() => setIsHovered(!isHovered)}>
          {isHovered ? 
 <IoClose /> : 
 <GiHamburgerMenu />
          }
        </div>
        {isHovered && (
          <Dropdown />
        )}
        </div>
    <div className="relative row-span-1 col-span-2 xl:row-span-1 xl:col-span-1 bg-[#1a1a1a]  text-white max-h-screen w-full overflow-y-scroll ">
      <div className="flex flex-col items-center max-h-screen max-w-full  ml-1 ">
          {musicList.length > 0 ? (
            musicList.map((music, index) => (
                <div className="w-full p-2" key={music.musicKey}>
                    <div className="w-full h-20 p-2 bg-[#3f3e3a] flex justify-between items-center rounded-lg">
                        <div className="h-full flex gap-3 items-center overflow-hidden">
                            <div onClick={() => handleGetMusic(music.musicKey, music.title, index)} className="thumbnail w-16 h-full rounded-md bg-[#ff6f61] cursor-pointer"></div>
                            <div className="leading-5">
                                <p>{music.title}</p>
                                <p className="text-[#b0b0b0]">artist name</p>
                            </div>
                        </div>
                        <div className="h-full flex items-center gap-3">
                          {isAdmin ? (
                            <>
                            <button className="w-16 h-10 mr-2 rounded-md bg-[#1a1a1a] text-white text-lg cursor-pointer font-bold transition-all" onClick={() => handleDownloadFile(music.musicKey, music.title)}>!</button>
                            </>
                          ): (
                            <>
                            {isMusicPurchased(music.id) ? (
                            <button className="w-16 h-10 mr-2 rounded-md bg-[#1a1a1a] text-white text-lg cursor-pointer font-bold transition-all" onClick={() => handleDownloadFile(music.musicKey, music.title)}>!</button>
   
                    ): (
                      <button className="w-16 h-10 mr-2 rounded-md bg-[#1a1a1a] text-white text-lg cursor-pointer font-bold transition-all" onClick={() => handleCreateOrder(music.amount, music.id)}>₹ {music.amount}</button>
                    ) } 
                            </>
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

<div className="absolute left-0 bottom-0 sm:hidden">
      {currentMusic.filepath ? (
        <MusicPlayer filepath={currentMusic.filepath} filename={currentMusic.filename} artist={currentMusic.artist} playNext={handleNextSong} playPrev={handlePrevSong}/>
      ): (
        // <div className="text-white"> no music playing </div>
        <div className="w-screen  h-full ">
                            <MusicPlayer filepath="none" filename="none" artist="none" />

        </div>
      )}
    </div>

    </div>

    <div className="hidden sm:block p-2 mb-2">
      {currentMusic.filepath ? (
        <MusicPlayer filepath={currentMusic.filepath} filename={currentMusic.filename} artist={currentMusic.artist} playNext={handleNextSong} playPrev={handlePrevSong}/>
      ): (
        // <div className="text-white"> no music playing </div>
        <div className=" w-[98%] m- h-full overflow-hidden">
                
                            <MusicPlayer filepath="none" filename="none" artist="none" />
        </div>
      )}
    </div>
    
</div>
{displayRazorpay && toPurchase &&(
      <RenderRazorpay
        amount={orderDetails.amount}
        orderId={orderDetails.orderId}
        musicId={toPurchase}
        keyId={import.meta.env.VITE_RAZORPAY_ID}
        keySecret={import.meta.env.VITE_RAZORPAY_SECRET}
      />)
      }
</>
  );
}
