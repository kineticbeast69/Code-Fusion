import { CodeModel } from "../model/codeDatabase.js";

const createCode = async (req, res) => {
  const { title, description, userID } = req.body;
  try {
    const addProject = new CodeModel({
      title: title,
      description: description,
      userID,
    });
    await addProject.save();
    res.status(200).json({ messgae: "add the project" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error from the add the project" });
  }
};
const readProject = async (req, res) => {
  const { userID } = req.params;
  if (!userID) {
    return res.status(400).json({ message: "userid is not found" });
  }
  try {
    const data = await CodeModel.find({ userID: userID }).populate("userID");
    if (data.length === 0) {
      return res.status(404).json({ message: "no data found", project: false });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "server error fom read project" });
    console.log(error);
  }
};
const singleProject = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "can't find the id" });
  }
  try {
    const data = await CodeModel.findById(id).select("-userID");
    if (!data) return res.status(400).json({ message: "No project found." });
    res.status(200).json({ message: "project code", data });
  } catch (error) {
    res.status(500).json({ message: "server error from fetch project" });
    console.log(error);
  }
};

const updateProject = async (req, res) => {
  const { id, html, css, js } = req.body;
  try {
    const updateCode = await CodeModel.findByIdAndUpdate(id, { html, css, js });
    if (!updateCode)
      return res.status(400).json({ message: "No project Found." });
    res.status(200).json({ message: "Code uploaded succesfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "technical error" });
  }
};

const deleteProject = async (req, res) => {
  const id = req.params.projectID;
  if (!id) console.log("project id is not found");
  try {
    const deleteCode = await CodeModel.findByIdAndDelete(id);
    if (!deleteCode) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json({ message: "code deleted succesfully." });
  } catch (error) {
    res.status(500).json({ message: "server error on delete route" });
    console.log(error);
  }
};
export { createCode, readProject, deleteProject, singleProject, updateProject };
