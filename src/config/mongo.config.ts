import mongoose from 'mongoose'

export const mongooseConnect = () => {
    mongoose
        .connect('mongodb://localhost:27017/orders_payment')
        .then(() => console.log('mongo has been connected'))
}
