import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Pin } from "../models/pinModel.js";

// create
export const createPin = async (req, res) => {
  try {
    const { title, pin } = req.body;
    // check the fields
    if (!title || !pin) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // getting file
    const file = req.file;
    // check the file
    if (!file) {
      return res.status(400).send({ message: "File is not found" });
    }

    const fileUrl = getDataUrl(file);

    // uploading to cloudinary
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    // creating the pin
    await Pin.create({
      title,
      pin,
      image: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
      ownedBy: req.user._id,
    });

    return res.status(200).send({ message: "Pin created" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// get all pins by latest
export const getAllPins = async (req, res) => {
  try {
    const pins = await Pin.find().sort({ createdAt: -1 });
    return res.status(200).send(pins);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// get single pin
export const getSignlePin = async (req, res) => {
  const id = req.params.id;

    // check the id
  if (!id) {
    return res.status(400).send({ message: "Id not found" });
  }

  try {
    // check the pin does exists
    const singlePin = await Pin.findById(id).populate("ownedBy","-password");
    if(!singlePin){
        return res.status(400).send({ message: "No pin found with this id" });
    }

    return res.status(200).send(singlePin);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// comment on pin 
export const commentOnPin = async (req,res) => {
  const pin = await Pin.findById(req.params.id)
  // check if the exists
  if (!pin) {
    return res.status(400).send({message:"No pin is found with this id"})
  }
  try {
  //  add the comment
  pin.comments.push({
    user:req.user._id,
    name:req.user.name,
    comment:req.body.comment
  })
  // save it
  await pin.save()
  return res.status(200).send({message:"Comment added"})
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

// delete pin
export const deletePin = async (req,res) => {
  const pin = await Pin.findById(req.params.id)
  // check if the exists
  if (!pin) {
    return res.status(400).send({message:"No pin is found with this id"})
  }
  // check comment id
  if (!req.query.commentId){
    return res.status(400).send({message:"Please give comment id"})
  }

  // get comment index
  const commentIndex = pin.comments.findIndex((item) => item._id.toString() === req.query.commentId.toString())
  if (commentIndex === -1){
    return res.status(400).send({message:"Comment not found"})
  }

  // get comment using comment index
  const comment = pin.comments[commentIndex]

  if(comment.user.toString() === req.user._id.toString()){
    pin.comments.splice(commentIndex,1)

    await pin.save()
    return res.status(200).send({message:"comment deleted"})
  }

}