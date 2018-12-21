import Settings from "../models/setting";

async function addSettings(req, res, next) {
  const userId = req.user.id;
  const categories = req.body.categories;
  const settings = await Settings.findOneAndUpdate(
    { _id: userId },
    { $set: { categories: categories } },

    {
      upsert: true,
      new: true
    }
  );
  return res.status(200).send(settings);
}

export { addSettings };
