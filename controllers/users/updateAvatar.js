const fs = require("fs").promises;
const path = require("path");
const { userService } = require("../../service");
const Jimp = require("jimp");

const avatarsDir = path.join(process.cwd(), "public/avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { filename, path: tempPath } = req.file;

    if (tempPath) {
      Jimp.read(tempPath)
        .then((result) => {
          return result.resize(250, 250).write(tempPath);
        })
        .then(() => {
          const filePath = path.join(avatarsDir, `${userId}-${filename}`);
          fs.rename(tempPath, filePath);
          return filePath;
        })
        .then((filePath) => {
          req.body.avatarURL = filePath;
          const user = userService.updateById(userId, req.body);
          return user;
        })
        .then((user) => {
          res.json({
            status: "success",
            code: 200,
            data: {
              avatarURL: user.avatarURL,
            },
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
