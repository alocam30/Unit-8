'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {
    static associate(models) {}
  };

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a value for 'title'",
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a value for 'author'",
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};