//import sequelize
import {Sequelize} from 'sequelize';
// import connection database
import sequelize from "./mysql.js";


//const nametable = 'note'; // Table name

export const Note = sequelize.define('note', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  author: Sequelize.STRING,
  archived: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,},
},
{
	 timestamps: true,
});


export const Tag = sequelize.define('tag', {

  tag: Sequelize.STRING,
},
{
   timestamps: false,
});

export const TagsXNote = sequelize.define('tagsxnote', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
},
{
     timestamps: false,
});

Tag.belongsToMany(Note,{through :TagsXNote});
Note.belongsToMany(Tag,{through : TagsXNote});

