import {
  doc,
  updateDoc,
  sendPasswordResetEmail,
  updateProfile,
  db,
  storage,
  auth,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "../firebase/config";
import { toast } from "react-toastify";

const useUploadImage = (
  file,
  fileName,
  setProgress,
  setDownLoadURL,
  collName,
) => {
  const metadata = {
    contenType: "image/*",
  };
  const storageRef = ref(storage, `${collName}/${fileName}`);

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          toast.error(`"Error .."+${error.code} `);
          // console.log(error.code);
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setDownLoadURL((prev) => ({
          ...prev,
          ["photoURL"]: downloadURL,
        }));
      });
    },
  );
};

export default useUploadImage;
