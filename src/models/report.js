module.exports = (Sequelize, DataTypes) => {
  const Report = Sequelize.define('Report', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      required: true,
    },
    studentOne: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    studentTwo: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    textFileOne: {
      type: DataTypes.STRING,
      required: true,
    },
    textFileTwo: {
      type: DataTypes.STRING,
      required: true,
    },
    similarity: {
      type: DataTypes.INTEGER,
      required: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      required: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      required: true,
    }
  }, {});
  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Report;
};