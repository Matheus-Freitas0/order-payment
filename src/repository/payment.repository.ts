import { PaymentDTO } from "../DTO/payment.dto";
import Payment from "../models/payment.model";
import { generateUUIDSimple } from "../utils/utils";

export class PaymentRepository {
  async create(paymentDTO: PaymentDTO, paymentStatus: 'SUCCESS' | 'FAILED', paymentMessage: string = 'success'): Promise<any> {
    const transactionNumber = generateUUIDSimple();

    const payment = new Payment({
      amount: paymentDTO.amount,
      cardNumber: paymentDTO.cardNumber,
      transactionNumber,
      partnerId: paymentDTO.partnerId,
      paymentMethod: paymentDTO.paymentMethod,
      clientDocument: paymentDTO.clientDocument,
      orderCode: paymentDTO.orderCode,
      status: paymentStatus,
      statusMessage: paymentMessage,
    });
    await payment.save();
    return payment
  }

  async getByOrderCode(orderCode: string): Promise<any> {
    return await Payment.findOne({ orderCode });
  }

  async getByTransactionId(transactionNumber: string): Promise<any> {
    return await Payment.findOne({ transactionNumber })
}

}
