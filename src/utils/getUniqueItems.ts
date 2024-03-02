import { ItemType } from "../types";


const getUniqueItems = (items: ItemType[]) => {
    const uniqueItemIds = new Set<string>()

    const uniqueItems = items.filter(item => {
        if (uniqueItemIds.has(item.id)) return false;

        uniqueItemIds.add(item.id);
        return true;
    })

    return uniqueItems;
}



export default getUniqueItems;