import axios from "axios";
import reduxIndex from '../redux/index'

const {store} = reduxIndex()

const uploader = async (fileForm) => {
  const UPLOAD_PRESET = 'akmdialr';
  const API_KEY = '167352867514218';
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/bassem12345/auto/upload';

  fileForm.append("upload_preset", UPLOAD_PRESET);
  fileForm.append("api_key", API_KEY);

  store.dispatch({ type: 'SET_LOADER_FLAG',payload:true })

  return (
    axios
      .post(CLOUDINARY_URL, fileForm)
      .then(res => {
        if (res.status === 200) {
          store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
          return { status: "success", link: res.data.url };
        }
      })
      .catch(err => {
        store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
        console.log("err",err)
        return { status: "failure" };
      })
  );
};
export default uploader;