import Sequelize from "sequelize";

const formdata = (sequelize) => {
  const Form = sequelize.define("Forms", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    yearOfStudy: {
      type: Sequelize.STRING,
    },
    profInCharge: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    domain: {
      type: Sequelize.STRING,
    },
    n_gpu: {
      type: Sequelize.INTEGER,
    },
    gpu_memory: {
      type: Sequelize.INTEGER,
    },
    n_cpu: {
      type: Sequelize.INTEGER,
    },
    n_cuda_cores: {
      type: Sequelize.INTEGER,
    },
    n_tensor_cores: {
      type: Sequelize.INTEGER,
    },
    system_memory: {
      type: Sequelize.INTEGER,
    },
    os: {
      type: Sequelize.STRING,
    },
    os_version: {
      type: Sequelize.STRING,
    },
    dgx_drivers: {
      type: Sequelize.STRING,
    },
    containers: {
      type: Sequelize.STRING,
    },
    containers_version: {
      type: Sequelize.STRING,
    },
    from_date: {
      type: Sequelize.DATE,
    },
    to_date: {
      type: Sequelize.DATE,
    },
    is_approved: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Form;
};

export default formdata;
