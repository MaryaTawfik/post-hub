import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const bloggerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['blogger', 'admin'],
            default: 'blogger'
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    },
    { timestamps: true }
)

bloggerSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (error: any) {
        throw new Error(error);
    }

});
bloggerSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password
    );
}

export default mongoose.model('Blogger', bloggerSchema)