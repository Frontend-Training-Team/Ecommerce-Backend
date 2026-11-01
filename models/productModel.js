const mongoose = require ("mongoose")
const slugify = require("slugify")

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "User" ,
            required: true
        } ,
        
        rating: {
            type: Number ,
            required: true ,
            min: 1 ,
            max: 5
        } ,

        comment: {
            type: String ,
            required: true ,
            trim: true
        } , 

    } ,

    {
        timestamps: true ,
    }
)

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String ,
            required: true ,
            trim: true ,
        } ,

        description: {
            type: String ,
            required: true ,
            trim: true ,
        } ,

        price: {
            type: Number ,
            required: true ,
            min: 0 ,
        } ,

        stock: {
            type: Number ,
            required: true ,
            min: 0 ,
            default: 0 ,
        } ,

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        brand: {
            type: String,
            required: true,
            trim: true,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        images: {
            type: [
                {
                    url: {
                        type: String,
                        required: true,
                    },
                    publicId: {
                        type: String,
                        required: true,
                    },
                },
            ],
            validate: {
                validator: function (images) {
                    return Array.isArray(images) && images.length >= 1 && images.length <= 5;
                },
                message: "Product must have between 1 and 5 images",
            },
            required: true,
        },
        
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory",
        },
        
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        numReviews: {
            type: Number,
            default: 0,
        },
        
        averageRating: {
            type: Number,
            default: 0,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        reviews: {
            type: [reviewSchema],
            default: [],
        },
    },

    {
        timestamps: true,
    }
)

productSchema.pre("save", function () {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
        });
    }
})

productSchema.methods.calcAverageRating = function () {
    this.numReviews = this.reviews.length;

    if (this.numReviews === 0) {
        this.averageRating = 0;
        return;
    }

    const totalRating = this.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    this.averageRating = Number(
        (totalRating / this.numReviews).toFixed(1)
    );
};

productSchema.index({
    name: "text",
    description: "text",
    brand: "text",
});

productSchema.index({
    category: 1,
    price: 1,
    createdAt: -1,
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;

console.log("Product Model Loaded Successfully!");

console.log(ProductModel.modelName);