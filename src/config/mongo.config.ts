import mongoose from 'mongoose'

export const mongooseConnect = () => {
    mongoose
        .connect('mongodb://192.168.15.6:27017/orders_payment')
        .then(() => console.log('mongo has been connected'))
}
