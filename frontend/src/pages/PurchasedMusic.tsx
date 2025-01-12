import { useState, useEffect } from "react";
import axios from "axios";
import MusicList from "../components/MusicList";
  

export default function PurchasedMusic () {

      const [musicList, setMusicList] = useState<MusicList[]>([]);
      useEffect(() => {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/get-purchased-music`,{}, {withCredentials: true})
          .then((response) => {
            setMusicList(response.data);
          })
          .catch((err) => console.error(err));
      }, []);
    return (
      <div>
        <MusicList musicList={musicList} handleGetMusic={() => {}} handleCreateOrder={() => {}}/>
      </div>
    )
}