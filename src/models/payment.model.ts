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
    //testar melhor validator do numero do cartão (luhn ou usar validator)
    //colocar minimo e maximo nos codigos?
    //usar timestamp?
    //estudar algoritmo Luhn

    amount: {
        type: Number,
        required: [true, 'O valor total é obrigatório'],
        min: [0.01, 'O valor do pagamento deve ser maior que zero'],
    },
    
    created: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    
    cardNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(value: string) {
                const formattedValue = value.replace(/[\s-]/g, '');
                return formattedValue.length >= 13 && luhnCheck(formattedValue);
            },
            message: 'O número do cartão de crédito é inválido',
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
            message: [`Só é possivel colocar estes metodos de pagamento: credit', 'debit', 'cash','pix`],
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
paymentSchema.index({ partnerId: 1, clientDocument: 1, orderCode: 1, transactionNumber: 1 });


export default mongoose.model('Payment', paymentSchema)