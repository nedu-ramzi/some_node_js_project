import { Router } from 'express';
import { Product } from '../model/product.js';
import { Category } from '../model/category.js';
import mongoose from 'mongoose';
import multer from 'multer';

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];

        let uploadError = new Error('Invalid Image Type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/upload')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})

const uploadOptions = multer({ storage: storage });

export const router = Router();

router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') };
    }
    const productList = await Product.find(filter).populate('category');
    // .select('name image');

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        res.status(500).json({ success: false })
    }
    res.send(product);
});

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category!');

    const file = req.file;
    if (!file) {
        return res.status(400).send('No Image in the request')
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/Backend/public/upload/`;

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    });
    await product.save();

    if (!product) {
        return res.status(500).send('The product cannot be created')
    }
    res.send(product);

});

router.put(`/:id`, async (req, res) => {
    const validId = mongoose.isValidObjectId(req.params.id);
    if (!validId) {
        return res.status(400).send('Invalid Product Id!');
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category!');

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        { new: true });

    if (!product) {
        res.status(500).send('This product can not be updated')
    }
    res.send(product);

});

router.delete(`/:id`, (req, res) => {
    Product.findByIdAndRemove(req.params.id).then((product) => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: 'product not found!' })
        }
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err });
    })
});

router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({ productCount: productCount });
});

router.get(`/get/featured/:count`, async (req, res) => {
    const count = parseInt(req.params.count ? req.params.count : 0);
    const product = await Product.find({ isFeatured: true }).limit(count);

    if (!product) {
        res.status(500).json({ success: false })
    }
    res.send(product);
});

router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    const validId = mongoose.isValidObjectId(req.params.id);
    if (!validId) {
        return res.status(400).send('Invalid Product Id!');
    }
    const files = req.files;
    let imagesPath = [];
    const basePath = `${req.protocol}://${req.get('host')}/Backend/public/upload/`;
    if (files) {
        files.map((file) => {
            imagesPath.push(`${basePath}${file.filename}`)
        })
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPath,
        },
        { new: true });

    if (!product) {
        res.status(500).send('This product can not be updated')
    }
    res.send(product);
})