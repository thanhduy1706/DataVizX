const Report = require("../models/report.model");
const User = require("../models/user.model");

const reportController = {
    //[GET] /report/all_reports
    // admin function
    async getAllReport(req, res) {
        try {
            const reports = await Report.find();
            if (reports) {
                res.status(200).json(reports);
            } else {
                res.status(200).json({ message: "do not have any reports" });
            }
        } catch (e) {
            console.log(e);
        }
    },

    //------------------------------------------ user function--------------------------------------------------------
    // [GET] /report
    reportForm(req, res) {
        try {
            res.status(200).json({ status: true, message: "report form" });
        } catch (e) {
            console.log(e);
        }
    },

    // POST /report/sendReport
    async sendReport(req, res) {
        try {
            console.log(req.body);
            const user = await User.findOne({ userName: req.body.post.username });
            if (!user) {
                res
                    .status(200)
                    .json({ status: true, message: "do not have this user" });
            }
            console.log("this is " + user);
            const newReport = new Report({
                userId: user._id,
                content: req.body.post.content,
            });
            console.log(newReport);
            newReport.save();
            res.status(200).redirect("/report");
        } catch (e) {
            console.log("this is error  " + e);
        }
    },
};
module.exports = reportController;
