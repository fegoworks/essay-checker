module.exports = (Sequelize, DataTypes) => {
  const Report = Sequelize.define('Report', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
    },
    studentOne: {
      type: DataTypes.STRING,
      required: true,
    },
    studentTwo: {
      type: DataTypes.STRING,
      required: true,
    },
    firstFile: {
      type: DataTypes.STRING,
      required: true,
    },
    secondFile: {
      type: DataTypes.STRING,
      required: true,
    },
    grade: {
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
      foreignKey: 'id',
      as: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Report;
};