import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notificationActions } from "../store/notificationSlice";
import "./Notification.scss";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.active) {
      switch (notification.type) {
        case "success":
          toast.success(notification.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => {
              dispatch(notificationActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        case "error":
          toast.error(notification.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => {
              dispatch(notificationActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        case "warning":
          toast.warning(notification.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => {
              dispatch(notificationActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        case "info":
          toast.info(notification.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => {
              dispatch(notificationActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        default:
          toast(notification.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => {
              dispatch(notificationActions.DESACTIVE_NOTIFICATION());
            },
          });
      }
    }
  }, [notification, dispatch]);

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    ></ToastContainer>
  );
};

export default Notification;
