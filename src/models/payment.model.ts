import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    
    created: {
        type: Date,
        default: Date.now
    },
    
    cardNumber: {
        type: String,
        required: true
    },

    transactionNumber: {
        type: String,
        required: true,
        unique: true
    },

    partnerId: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true,
        enum: {
            values: ['credit', 'debit', 'cash','pix']
        }
    },
    
    clientDocument: {
        type: String,
        required: true,
        match: /^\d{11}$|^\d{14}$/
    },

    orderCode: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model('Payment', paymentSchema)