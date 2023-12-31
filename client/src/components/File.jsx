import React, { useEffect, useState } from "react";
import { errorMessege, loadingMessege, successMessege } from "./ToastMesseges";
import axios from "axios";
import toast from "react-hot-toast";
import { ref, getStorage, deleteObject } from "firebase/storage";
import { app } from "../../firebase.config";

const File = ({ title, url, id, setIsChanged, setFilUrl, fileref }) => {
  const storage = getStorage(app);
  const fileRef = ref(storage, fileref);

  const [fileType, setFileType] = useState("");

  const clipBoard = () => {
    successMessege("Link copied in clipboard");
    window.navigator.clipboard.writeText(url);
  };

  const deletFile = () => {
    loadingMessege("deleting file...");
    deleteObject(fileRef)
      .then(() => {
        axios
          .delete(`${import.meta.env.VITE_FILE_URL}/delete/${id}`, {
            withCredentials: true,
          })
          .then(() => {
            toast.dismiss();
            successMessege("file deleted successfully");
            setIsChanged(true);
            setFilUrl("");
          })
          .catch(() => {
            toast.dismiss();
            errorMessege("error deleting file");
          });
      })
      .catch(() => {
        toast.dismiss();
        errorMessege("error deleting file");
      });
  };

  const prepareMail = () => {
    setFilUrl(url);
  };

  useEffect(() => {
    if (
      title.split(".")[1] === "jpeg" ||
      title.split(".")[1] === "png" ||
      title.split(".")[1] === "jpg" ||
      title.split(".")[1] === "gif"
    ) {
      setFileType("image");
    } else if (
      title.split(".")[1] === "mp3" ||
      title.split(".")[1] === "aud" ||
      title.split(".")[1] === "m4a" ||
      title.split(".")[1] === "wav"
    ) {
      setFileType("audio");
    } else if (
      title.split(".")[1] === "mp4" ||
      title.split(".")[1] === "avi" ||
      title.split(".")[1] === "mkv"
    ) {
      setFileType("video");
    } else if (
      title.split(".")[1] === "exe" ||
      title.split(".")[1] === "apk" ||
      title.split(".")[1] === "rar" ||
      title.split(".")[1] === "msi"
    ) {
      setFileType("application");
    } else if (
      title.split(".")[1] === "pptx" ||
      title.split(".")[1] === "docx" ||
      title.split(".")[1] === "txt" ||
      title.split(".")[1] === "docx" ||
      title.split(".")[1] === "xlxs" ||
      title.split(".")[1] === "pdf" ||
      title.split(".")[1] === "pptx"
    ) {
      setFileType("document");
    } else {
      setFileType("others");
    }
  }, []);

  return (
    <div className="flex w-full justify-between items-center py-4">
      <div className="flex items-center gap-2 dark:text-gray-300">
        {fileType === "image" && (
          <i className="text-blue-400 text-lg fa-regular fa-file-image"></i>
        )}
        {fileType === "audio" && (
          <i className="text-blue-400 text-lg fa-regular fa-file-audio"></i>
        )}
        {fileType === "document" && (
          <i className="text-blue-400 text-lg fa-regular fa-file-lines"></i>
        )}
        {fileType === "application" && (
          <i className="text-blue-400 text-lg fa-regular fa-file-code"></i>
        )}
        {fileType === "others" && (
          <i className="text-blue-400 text-lg fa-regular fa-file"></i>
        )}
        {title}
      </div>
      <div className="flex items-center gap-7 text-gray-400">
        <i
          className="fa-regular fa-copy cursor-pointer hover:text-blue-400"
          onClick={clipBoard}
        ></i>
        <i
          className="fa-regular fa-envelope cursor-pointer hover:text-blue-400"
          onClick={prepareMail}
        ></i>
        <span
          className="material-symbols-outlined cursor-pointer hover:text-blue-400 text-xl"
          onClick={deletFile}
        >
          delete
        </span>
      </div>
    </div>
  );
};

export default File;
