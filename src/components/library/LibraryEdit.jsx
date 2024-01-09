import React, { useRef, useState } from "react";
import "./LibraryEdit.scss";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import apiClient from "../../spotify";
import { resizeImage } from "../../functions/imageUtils";
import { notificationActions } from "../../store/notificationSlice";
import { useDispatch } from "react-redux";

const LibraryEdit = ({ setShowEdit, playlist, onEdit }) => {
  const formRef = useRef();
  const [previewImage, setPreviewImage] = useState();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    // Obtener valores específicos
    const name = formData.get("name");
    const description = formData.get("description");
    const file = formRef.current.querySelector('input[name="image"]').files[0];
    let resizedImage;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      // Redimensionar la imagen antes de enviarla
      resizedImage = await resizeImage(file, 800, 600); // Ajusta las dimensiones según tus necesidades
      formData.append("image", resizedImage);
    }

    //console.log(previewImage.split("/").pop());

    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }
    const updatedData = {
      name: name,
      description: description,
      public: true, // Ajusta según tus necesidades
    };

    try {
      await apiClient.put(`playlists/${playlist.id}`, updatedData);
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "Playlist edited",
          type: "success",
        })
      );

      onEdit();
      /*const responseImage = await apiClient.put(
        `/playlists/${playlist.id}/images`,
        resizedImage
      );
      console.log(responseImage);
      console.log("Imagen actualizada con éxito");
      onEdit();*/
    } catch (error) {
      console.error("Error al actualizar la playlist:", error.response.data);
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "The playlist couldn't be edited",
          type: "error",
        })
      );
    }
    setShowEdit(false);
  };

  return (
    <Card onClose={() => setShowEdit(false)}>
      <form ref={formRef} onSubmit={submitHandler} className="formLibrary">
        <div className="formInputsContainer">
          <div className="imagesInputcontainer">
            <label htmlFor="image" className="labelImageEdit">
              <img
                className="imageEdit"
                src={previewImage || playlist?.images[0]?.url}
                alt="ImagePlaylist"
              />
              <p className="setImageText">Set Image</p>
            </label>
            <input
              name="image"
              id="image"
              type="file"
              className="inputFile"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="textInputContainer">
            <label htmlFor="name">Name</label>
            <input
              className="inputPlaylist"
              name="name"
              id="name"
              type="text"
              defaultValue={playlist.name}
              resize="none"
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="inputPlaylist"
              name="description"
              id="description"
              defaultValue={playlist?.description}
            ></textarea>
          </div>
        </div>
        <div className="buttonContainer">
          <Button styles="focus" type="submit">
            Ok
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LibraryEdit;
