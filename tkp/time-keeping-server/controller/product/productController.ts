import { Product } from "../../models/product";
import { collections } from "../../services/database.service";

export default async function getProduct() {
    let product: Product[] = (await collections.product?.find({
    }).toArray()) as unknown as Product[];
    return product;
}

export async function editProduct(id: string, newproduct: Product) {
    let isSuccess = await collections.product?.updateOne({ "id": id }, { "$set": { newproduct } });
    return isSuccess;
}
export async function removeProduct(id: string) {
    let isSuccess = await collections.product?.deleteOne({ "id": id });
    return isSuccess;
}