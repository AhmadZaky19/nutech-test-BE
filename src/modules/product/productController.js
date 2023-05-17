const productModel = require("./productModel");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/uploads/deleteFile");

module.exports = {
  getAllProduct: async (request, response) => {
    try {
      let { search, page, limit } = request.query;
      page = Number(page) || 1;
      limit = Number(limit) || 3;
      search = search || "";
      const offset = page * limit - limit;
      const totalData = await productModel.getCountProduct(search);
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await productModel.getAllProduct(search, limit, offset);
      if (result.length < 1) {
        return helperWrapper.response(
          response,
          200,
          "Product not found",
          result
        );
      }
      if (page > totalPage) {
        return helperWrapper.response(response, 400, "Page not found", null);
      }

      return helperWrapper.response(
        response,
        200,
        "Success get data",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        response,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productModel.getProductById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Product by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(
        res,
        200,
        "Success get product by id",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  postProduct: async (req, res) => {
    try {
      const { name, buy_price, sell_price, stock } = req.body;
      const setData = {
        name,
        buy_price,
        sell_price,
        stock,
        image: req.file ? req.file.filename : null,
      };
      const result = await productModel.postProduct(setData);
      return helperWrapper.response(res, 200, "Success post product", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await productModel.getProductById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Product by id ${id} not found !`,
          null
        );
      }
      const { name, buy_price, sell_price, stock } = req.body;
      const setData = {
        name,
        buy_price,
        sell_price,
        stock,
        image: req.file ? req.file.filename : null,
        updated_at: new Date(Date.now()),
      };
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });
      if (req.file && checkId[0].image) {
        deleteFile(`public/image/${checkId[0].image}`);
      }
      const result = await productModel.updateProduct(setData, id);
      return helperWrapper.response(res, 200, "Success update data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await productModel.getProductById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Product by id ${id} not found !`,
          null
        );
      }
      if (checkId[0].image) {
        deleteFile(`public/image/${checkId[0].image}`);
      }
      const result = await productModel.deleteProduct(id);
      return helperWrapper.response(
        res,
        200,
        `Success delete product by id ${id}`,
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
