const Product = require("../models/Product");
const ApiFeatures = require("../utils/apifeatures");

/**create Product (admin) */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, Stock } = req.body;
    //         let images = [];

    //   if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    //   } else {
    //     images = req.body.images;
    //   }

    //   const imagesLinks = [];

    //   for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //       folder: "products",
    //     });

    //     imagesLinks.push({
    //       public_id: result.public_id,
    //       url: result.secure_url,
    //     });
    //   }

    //   req.body.images = imagesLinks;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      Stock,
      images: {
        public_id: "this is sample image",
        url: "this is sample url",
      },
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**Get admin all products */

exports.AdminAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**Get All Products */

exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 4;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search();
    let products = await apiFeature.query.clone();
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**get Product Details */

exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Product not exist with this ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

/** update products */

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(400).json({
            success: false,
            message: "Product not found"
        })
    }
    // Images Start Here
//   let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   if (images !== undefined) {
//     // Deleting Images From Cloudinary
//     for (let i = 0; i < product.images.length; i++) {
//       await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//     }

//     const imagesLinks = [];

//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "products",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//   }

    product = await Product.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message:"Product Updated Successfully",
        product,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**Delete Product */

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        // Deleting Images From Cloudinary
//   for (let i = 0; i < product.images.length; i++) {
//     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//   }

        await product.remove();
        res.status(200).json({
            success: true, 
            message: "Product Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}