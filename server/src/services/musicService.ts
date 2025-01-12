import { musicModel, purchasedModel } from "../database/models"

export const getPurchasedMusic =async (userId: string) => {
    try {
        if(userId === 'ADMIN') {
            const result = await musicModel.find({});
            return result;
        }
        const result = await purchasedModel.find({userId, payment: "successful"});
        return result;
    } catch (err) {
        return err;
    }
}