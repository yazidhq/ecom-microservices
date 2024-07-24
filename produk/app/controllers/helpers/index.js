const axios = require("axios");
const apiConfig = require("../../config/api.config");

exports.getFilter = function (sort, filter, limit) {
  var query = { raw: true };

  if (sort) {
    var ord = sort.split(";");
    var order_by = [];

    ord.forEach((element) => {
      var f = element.split(",");
      var ord_temp = [f[0], f[1]];
      order_by.push(ord_temp);
    });
  } else {
    var order_by = [["id", "DESC"]];
  }

  query.order = order_by;

  if (limit) {
    query.limit = parseInt(limit);
  }

  if (filter) {
    var flt = filter.split(";");
    var condition = [];

    flt.forEach((element) => {
      var f = element.split(",");

      var temp = {};
      switch (f[1]) {
        case "=":
          temp[f[0]] = { [Op.eq]: f[2] };
          break;
        case "!=":
          temp[f[0]] = { [Op.ne]: f[2] };
          break;
        case ">":
          temp[f[0]] = { [Op.gt]: f[2] };
          break;
        case "<":
          temp[f[0]] = { [Op.lt]: f[2] };
          break;
        case ">=":
          temp[f[0]] = { [Op.gte]: f[2] };
          break;
        case "<=":
          temp[f[0]] = { [Op.lte]: f[2] };
          break;
        case "like":
          temp[f[0]] = { [Op.iLike]: f[2] };
          break;
      }

      condition.push(temp);
    });

    query.where = { [Op.and]: condition };
  }

  return query;
};

exports.getConfig = async () => {
  const response = await axios({
    method: "get",
    url: apiConfig.auth_config,
    responseType: "json",
  });

  return response.data.config;
};

exports.getUserData = async (jwtToken) => {
  const response = await axios.get(apiConfig.auth_data, {
    headers: {
      Authorization: jwtToken,
    },
  });

  return response;
};

exports.unauthorized = (res) => {
  return res.status(401).send({
    status: 401,
    message: "Unauthorized",
    data: {},
    data_count: 0,
  });
};
