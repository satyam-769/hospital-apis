import User from "../models/user.js";
import Report from "../models/reports.js";

// Register a patient
const register = async function (req, res) {
  try {
    let user = await User.findOne({ username: req.body.number });

    if (user) {
      return res.status(200).json({
        message: "User Already Registered",
        data: {
          user: user,
        },
      });
    }

    const newUser = await User.create({
      username: req?.body?.number,
      name: req?.body?.name,
      password: "12345",
      type: "Patient",
    });

    return res.status(201).json({
      message: "Patient registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Create a patient report
const createReport = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(422).json({
        message: "Patient Does not exist",
      });
    }

    const report = await Report.create({
      createdByDoctor: req?.user?.id,
      patient: req?.params?.id,
      status: req?.body?.status,
      date: new Date(),
    });

    user.reports.push(report);

    return res.status(201).json({
      message: "Report created successfully",
      data: report,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get the patient report
const patientReports = async function (req, res) {
  try {
    const reports = await Report.find({ patient: req.params.id })
      .populate("createdByDoctor")
      .sort("date");

    const reportData = reports.map((report) => {
      const originalDate = report.date;
      const dateObj = new Date(originalDate);

      const formattedDate = dateObj.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return {
        createdByDoctor: report.createdByDoctor.name,
        status: report.status,
        date: formattedDate,
      };
    });

    return res.status(200).json({
      message: `List of Reports of User with id -  ${req.params.id}`,
      reports: reportData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export {
  register,
  createReport,
  patientReports,
}