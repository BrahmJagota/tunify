import axios from "axios"

export const getPurchasedMusic =async (setMusic: (music: MusicList[]) => void) => {
    try {
        const res = await axios.get('http://localhost:3000/get-purchased-music', {withCredentials: true})
        const { result } =  res.data;
        if(result) {
            setMusic(result);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        // will handle it later
        return false;
    }
}   