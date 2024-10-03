import { PaymentDTO } from "../DTO/payment.dto";
import Payment from "../models/payment.model";
import { generateUUIDSimple } from "../utils/utils";

export class PaymentRepository {
  async create(
    paymentDTO: PaymentDTO,
    paymentStatus: "SUCCESS" | "FAILED",
    paymentMessage: string = "success"
  ): Promise<void> {
    const transactionNumber = generateUUIDSimple();

    const payment = new Payment({
      amount: paymentDTO.amount,
      cardNumber: paymentDTO.cardNumber,
      transactionNumber,
      partnerId: paymentDTO.partnerId,
      method: paymentDTO.method,
      clientDocument: paymentDTO.clientDocument,
      orderCode: paymentDTO.orderCode,
      status: paymentStatus,
      statusMessage: paymentMessage,
    });
    await payment.save();
  }

  async getByOrderCode(orderCode: string): Promise<any> {
    return await Payment.findOne({ orderCode });
  }
}
