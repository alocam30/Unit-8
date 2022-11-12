'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
    // static associate(models) {}

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
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
    
  }, {sequelize});
  }
  return Book;
