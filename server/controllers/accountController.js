const mongoose = require('mongoose');
const zod = require('zod');
const { Account } = require('../model/Account');


const moneyTransferSchema = zod.object({
    "to": zod.string(),
    "amount": zod.number().min(1,"Enter Amount Correctly")
})

const getBalance = async (req, res) => {
    const userId = req.userId;
    try {
        const userAccount = await Account.findOne({ userId });
        if (!userAccount)
            return res.send(401).json({ msg: "User Account Not Found.Re-Check account Id or re-check token" });
        res.status(200).json({ balance: userAccount.balance });
    } catch (error) {
        res.status(411).json(error.message);
    }
}

const transferMoney = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { to, amount } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(to)) {
        return res.status(400).json({ msg: "Invalid user ID or recipient ID" });
    }
    const inputValidation = moneyTransferSchema.safeParse(req.body);
    if (!inputValidation.success) {
        const obj = inputValidation.error;
        return res.status(411).json(obj.issues.map(errmsg => `${errmsg.path[0]}:${errmsg.message}`));
    }
    if(amount<0)
        return res.status(411).json({msg:"Enter Amount Correctly"});

    const receiverAccount = await Account.findOne({ "userId": to }).session(session);
    if (!receiverAccount) {
        await session.abortTransaction();
        return res.status(401).json({ msg: "Receiver Account Not Found.Re-Check account Id" });
    }
    try {
        const senderAccount = await Account.findOne({ userId }).session(session);
        if (!senderAccount) {
            await session.abortTransaction();
            return res.send(401).json({ msg: "Sender Account Not Found.Re-Check account Id or check token" });
        }

        if (senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Insufficient Funds" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ msg: "Transaction Successfully Completed" });

    // if(senderAccount.equals(receiverAccount)){
    //     senderAccount.balance = senderAccount.balance;
    //     await senderAccount.save();
    //     return res.status(200).json({msg:"Transaction Successfully Completed"});
    // }

    // senderAccount.balance -= amount;
    // await senderAccount.save();
    // receiverAccount.balance += amount;
    // await receiverAccount.save();
} catch (error) {
    res.status(411).json(error.message);
}
}


module.exports = {
    getBalance,
    transferMoney
}