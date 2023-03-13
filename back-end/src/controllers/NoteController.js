const noteController = {};

//import model and Sequelize
import { Note, Tag, TagsXNote } from "../model/model.js";
import sequelize from "../model/mysql.js";

noteController.testdata = async (req, res) => {
  const response = await sequelize
    .sync()
    .then(function () {
      //Create tag
      Tag.create({
        tag: "Task",
      });
      //Create note
      Note.create({
        title: "Friday",
        content: "Go to the cinema.",
        author: "Pablo G.",
        archived: 0,
      });

      TagsXNote.create({
        noteId: 1,
        tagId: 1,
      });
      const data = Note.findAll;
      return data;
    })
    .catch((err) => {
      return err;
    });
  res.json({ success: true, data: response });
};

noteController.createNote = async (req, res) => {
  const { title, content, author, archived = 0, tags = [] } = req.body;
  const t = await sequelize.transaction();
  try {
    const data = await Note.create(
      {
        title,
        content,
        author,
        archived,
      },
      { transaction: t }
    );
    const aux = [];
    await Promise.all(
      tags.map(async (tag) => {
        let existingTag = await Tag.findAll(
          {
            where: {
              tag,
            },
          },
          { transaction: t }
        );
        if (existingTag.length) {
          existingTag = existingTag[0];
        } else {
          existingTag = await Tag.create(
            {
              tag,
            },
            { transaction: t }
          );
        }
        aux.push({ noteId: data.id, tagId: existingTag.id });
        return existingTag;
      })
    );
    await TagsXNote.bulkCreate(aux, { transaction: t });
    await t.commit();
    const note = await Note.findByPk(data.id, {
      include: [{ model: Tag }],
    });
    res.json({ success: true, data: note[0] });
  } catch (error) {
    await t.rollback();
  }
};

noteController.list = async (req, res) => {
  const data = await Note.findAll({
    where: {
      archived: 0,
    },
    include: [{ model: Tag }],
  });
  res.json(data);
};

noteController.getArchivedNotes = async (req, res) => {
  const data = await Note.findAll({
    where: {
      archived: 1,
    },
    include: [{ model: Tag }],
  });
  res.json(data);
};

noteController.getNote = async (req, res) => {
  const note = await Note.findByPk(req.params.id, {
    include: [{ model: Tag }],
  });
  if (!note) {
  } else {
    res.json(note);
  }
};

noteController.deleteNote = async (req, res) => {
  const { id } = req.params;
  await Note.destroy({
    where: {
      id: id,
    },
    cascade: true,
  });
  res.json("Note Deleted");
};

//Feature updating Note tags will not be developed...
noteController.updateNote = async (req, res) => {
  const { id, title, content, author } = req.body;
  const response = await sequelize
    .sync()
    .then(async function () {
      await Note.update(
        {
          title: title,
          content: content,
          author: author,
        },
        { where: { id } }
      );
    })
    .catch((err) => {
      return err;
    });
  res.json({ success: true, data: response });
};

noteController.archiveNote = async (req, res) => {
  const { id, value } = req.params;
  const response = await sequelize
    .sync()
    .then(async function () {
      await Note.update(
        {
          archived: value,
        },
        { where: { id } }
      );
    })
    .catch((err) => {
      return err;
    });
  res.json({ success: true, data: response });
};

noteController.listTags = async (req, res) => {
  const data = await Tag.findAll();
  res.json(data);
};

export default noteController;
