module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      unique: true,
    },
    userId: {
      type: Sequelize.UUID,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    studentOne: {
      type: Sequelize.STRING,
      required: true,
    },
    studentTwo: {
      type: Sequelize.STRING,
      required: true,
    },
    textFileOne: {
      type: Sequelize.STRING,
      required: true,
    },
    textFileTwo: {
      type: Sequelize.STRING,
      required: true,
    },
    similarity: {
      type: Sequelize.INTEGER,
      required: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Reports'),
};