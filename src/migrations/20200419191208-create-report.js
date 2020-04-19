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
    firstFile: {
      type: Sequelize.STRING,
      required: true,
    },
    secondFile: {
      type: Sequelize.STRING,
      required: true,
    },
    grade: {
      type: Sequelize.INTEGER,
      allowNull: true,
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