import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { app } from "../../firebase.config";
import axios from "axios";
import { v4 } from "uuid";
import { errorMessege, loadingMessege, successMessege } from "./ToastMesseges";
import { toast } from "react-hot-toast";

function Dropzone({ user_id, setIsUpload, setFilUrl }) {
  const storage = getStorage(app);
  const uploadFile = (file) => {
    loadingMessege("Uploading file...");
    const fileName = `${
      file[0].name.split(".")[0] + v4() + "." + file[0].name.split(".")[1]
    }`;
    const fileRef = ref(storage, fileName);
    uploadBytes(fileRef, file[0])
      .then(() => {
        getDownloadURL(fileRef)
          .then((url) => {
            axios
              .post(
                `${import.meta.env.VITE_FILE_URL}/add`,
                {
                  name: file[0].name,
                  url: url,
                  ref: fileName,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              )
              .then(() => {
                setIsUpload(true);
                setFilUrl(url);
                toast.dismiss();
                successMessege("file uploaded successfully");
              })
              .catch(() => {
                toast.dismiss();
                errorMessege("Something went wrong uploading!");
              });
          })
          .catch(() => {
            toast.dismiss();
            errorMessege("Something went wrong uploading!");
          });
      })
      .catch(() => {
        toast.dismiss();
        errorMessege("Something went wrong uploading!");
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    uploadFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-full h-72 flex items-center justify-center border-2 border-dotted border-blue-500 rounded bg-blue-50 flex-col cursor-pointer dark:bg-slate-900 dark:border-[#44466a]"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <i className="fa-solid fa-cloud-arrow-up text-5xl text-blue-400 "></i>
          <p className="text-base text-slate-700 mt-2">
            Drag 'n' drop some files here, or click to browse files
          </p>
        </>
      )}
    </div>
  );
}

export default Dropzone;
