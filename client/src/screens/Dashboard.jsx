import File from "../components/File";
import Dropzone from "../components/DropZone";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validate } from "email-validator";
import {
  errorMessege,
  loadingMessege,
  successMessege,
} from "../components/ToastMesseges";
import toast from "react-hot-toast";

const Dashboard = () => {
  const naviagte = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [files, setFiles] = useState([]);

  const [isChanged, setIsChangeded] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const [reciverEmail, setReciverEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const getUser = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_USER_URL}/get-data`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        setUserData(response.data);
      })
      .catch(() => {
        setIsLoading(false);
        naviagte("/auth");
      });
  };

  const getFiles = () => {
    axios
      .get(`${import.meta.env.VITE_FILE_URL}/files`, {
        withCredentials: true,
      })
      .then((response) => {
        setFiles(response.data);
        setIsChangeded(false);
      })
      .catch(() => {
        setIsChangeded(false);
        return;
      });
  };

  const sendMail = (ev) => {
    ev.preventDefault();
    loadingMessege("Sending mail...");
    axios
      .post(
        `${import.meta.env.VITE_FILE_URL}/sendmail`,
        {
          recivers_email: reciverEmail,
          sender_email: userData.email,
          url: fileUrl,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        toast.dismiss();
        successMessege("Email sent successfully!");
      })
      .catch(() => {
        toast.dismiss();
        errorMessege("Error sending mail!");
      });
  };

  useEffect(() => {
    if (validate(reciverEmail)) setValidEmail(true);
    else {
      setValidEmail(false);
    }
  }, [reciverEmail]);

  useEffect(() => {
    getUser();
    getFiles();
  }, []);

  useEffect(() => {
    getFiles();
  }, [isChanged]);

  // copy url

  const copyUrl = () => {
    window.navigator.clipboard.writeText(fileUrl);
    successMessege("Link copied in clipboard!");
  };

  return (
    <div className="w-full px-4 flex-col sm:px-9 md:px-12 lg:px-20 lg:flex-row xl:px-32 2xl:px-40 py-24 h-screen flex justify-between">
      <div className="w-ful lg:flex-1 lg:pe-3 lg:mb-0">
        <Dropzone
          setFilUrl={setFileUrl}
          setIsUpload={setIsChangeded}
          user_id={userData ? userData._id : ""}
        />
        {fileUrl && (
          <>
            <div className="url w-full my-3 py-2 border-2 border-dotted border-blue-400 rounded bg-slate-100 px-1 flex items-center relative dark:bg-transparent dark:border-[#44466a]">
              <Link
                className="text-slate-800 overflow-auto dark:text-gray-200"
                to={fileUrl}
              >
                {fileUrl}
              </Link>
              <i
                className="fa-regular fa-copy text-slate-400 cursor-pointer absolute top-2 right-1 text-xl"
                onClick={copyUrl}
              ></i>
            </div>
            <h6 className="text-center text-slate-600 mb-3">Send via Email</h6>
            <form
              className="email border w-full border-blue-400 rounded py-5 flex items-center justify-center flex-col"
              onSubmit={sendMail}
            >
              <div className="flex items-center">
                <label className="text-slate-600 dark:text-gray-400">
                  Reciver's Email:
                </label>
                <input
                  type="text"
                  className="outline-none border-b border-slate-400 ms-1 w-60 dark:bg-transparent dark:text-gray-200"
                  value={reciverEmail}
                  onChange={(e) => setReciverEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={validEmail ? false : true}
                className="btn-secondary mt-5 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Send File
              </button>
            </form>
          </>
        )}
        <p className="mt-4 text-slate-800 mb-3 dark:text-gray-400">
          * Please follow the terms and conditions while uploading and sharing
          files{" "}
          <Link to={"/"} className="text-blue-500 transition hover:underline">
            terms & conditions
          </Link>
        </p>
      </div>
      <div className="w-full lg:flex-1 lg:ps-3">
        <div className="w-full border border-slate-400 rounded min-h-40 dark:border-[#44466a]">
          <div className="w-full border-b border-slate-400 px-3 py-4 dark:border-[#44466a]">
            <p className="text-slate-700">Files</p>
          </div>
          <div
            className={`body max-h-750 overflow-auto py-1 px-3 ${
              files.length === 0 && "flex h-32 items-center justify-center"
            }`}
          >
            {files.length === 0 && (
              <span className="text-center text-slate-400">
                No files uploaded yet!
              </span>
            )}
            {files.map((file, index) => {
              return (
                <File
                  title={file.name}
                  url={file.url}
                  id={file._id}
                  key={index}
                  setIsChanged={setIsChangeded}
                  setFilUrl={setFileUrl}
                  fileref={file.ref}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
