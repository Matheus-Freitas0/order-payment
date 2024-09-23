import mongoose from 'mongoose'

function luhnCheck(cardNumber: string | any[]) {
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let intValue = parseInt(cardNumber[i]);
        if (i % 2 === cardNumber.length % 2) {
            intValue *= 2;
            if (intValue > 9) {
                intValue -= 9;
            }
        }
        sum += intValue;
    }
    return sum % 10 === 0;
}

const paymentSchema = new mongoose.Schema({
    //verificar se precisa das mensagens
    //testar melhor validator do numero do cartão
    //colocar minimo e maximo nos codigos?
    //usar timestamp?
    //estudar algoritmo Luhn

    amount: {
        type: Number,
        required: [true, 'O valor total é obrigatório'],
        min: [0, 'O valor do pagamento não pode ser menor que 0']
    },
    
    created: {
        type: Date,
        default: Date.now,
    },
    
    cardNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(value: any) {
                return luhnCheck(value.replace(/[\s-]/g, ''));
            },
            message: 'O número do cartão de crédito é inválido'
        }
    },

    transactionNumber: {
        type: String,
        required: [true, 'Numero da transação é obrigatório'],
        unique: true,
        trim: true,
    },

    partnerId: {
        type: String,
        required: [true, 'O Id é é obrigatório'],
    },

    paymentMethod: {
        type: String,
        required: [true, 'O metodo de pagamento é obrigatório'],
        enum: {
            values: ['credit', 'debit', 'cash','pix'],
            message: [`Só é possivel colocar estes metodos de pagamento: credit', 'debit', 'cash','pix`]
        },
    },
    
    clientDocument: {
        type: String,
        required: [true, 'Documento do cliente é obrigatório'],
        match: [/^\d{11}$|^\d{14}$/, 'Documento deve ser um CPF (11 números) ou CNPJ (14 números)'],
        trim: true,
    },

    orderCode: {
        type: String,
        required: [true, 'O codigo do pedido é obrigatório' ],
        trim: true,
    },
})
paymentSchema.index({ partnerId: 1 })
paymentSchema.index({ clientDocument: 1 })
paymentSchema.index({ orderCode: 1 })
paymentSchema.index({ transactionNumber: 1 })

export default mongoose.model('Payment', paymentSchema)