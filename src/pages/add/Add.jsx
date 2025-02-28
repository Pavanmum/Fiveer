import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile) || "data:image/jpeg;base64,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";

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs")
    },
  });

const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!state.title) missingFields.push("Title");
    if (!state.cat) missingFields.push("Category");
    if (!state.desc) missingFields.push("Description");
    if (!state.shortTitle) missingFields.push("Short Title");
    if (!state.shortDesc) missingFields.push("Short Description");
    if (!state.deliveryTime) missingFields.push("Delivery Time");
    if (!state.revisionNumber) missingFields.push("Revision Number");
    if (!state.price) missingFields.push("Price");
    if (!state.cover) missingFields.push("Cover Image");
    if (!state.images || state.images.length === 0) missingFields.push("Gallery Images");
    if (!state.features || state.features.length === 0) missingFields.push("Features");
  
    if (missingFields.length > 0) {
      alert(`Please fill out all required fields:\n- ${missingFields.join("\n- ")}`);
      return;
    }

    mutation.mutate(state);
    // navigate("/mygigs")
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
