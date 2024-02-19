const express = require("express");
const Product = require("../models/product");
const router = express.Router();
//create
router.post("/products", async (req, res) => {
	console.log(req.body);
	const product = new Product(req.body);
	try {
		await product.save();
		res.status(203).send(product);
	} catch (error) {
		res.status(400).send(error.message);
	}
});
//read all
router.get("/products", async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).send(products);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//read one
router.get("/products/:productId", async (req, res) => {
	try {
		const product = await Product.findOne({ productId: req.params.productId });
		if (!product) {
			return res.status(404).send({ message: "Product not found" });
		}
		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error);
	}
});
//updatebyid
router.patch("/products/:productId", async (req, res) => {
	const updates = Object.keys(req.body);
	// const allowedUpdates = ["name", "price"];
	// const isValidOperation = updates.every((update) => {
	// 	return allowedUpdates.includes(update);
	// });
	// if (!isValidOperation) {
	// 	return res.status(400).send({ error: "Invalid Updates" });
	// }
    console.log(updates);
	try {
		const product = await Product.findOne({ productId: req.params.productId });
		if (!product) {
			return res.status(404).send({ message: "Product not found" });
		}
		updates.forEach((update) => {
			product[update] = req.body[update];
			// await product.save();
		});
		await product.save();
        res.status(200).send({message: "Product deleted",product});
	} catch {
		res.status(500).send(error);
	}
});

//delete
router.delete("/products/:productId", async (req, res) => {
    try {
        
        const product = await Product.findOneAndDelete({ productId: req.params.productId });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
