import { collection, getDocs, limit, orderBy, query, QueryConstraint, startAfter, where } from "firebase/firestore";
import { db } from "../firbaseconfig"; // Adjust the path to your Firebase config

interface GetDataParams {
    page?: number;
    count?: boolean;
    lastid?: string | null;
}

interface Data {
    id: string;
    [key: string]: any; // Adjust the structure according to your actual job data
}

const pagination_size = 10; // Set your pagination size

const getData = async ({ page, count, lastid }: GetDataParams): Promise<Data[] | any> => {

    try {

        const queryConstraints: QueryConstraint[] = [];

        const postsRef = query(collection(db, "company"), ...queryConstraints);
        const querySnapshot = await getDocs(postsRef);
        const promises = querySnapshot.docs.map(async (doc) => {
            const data: Data = { id: doc.id, ...doc.data() };
            return data;
        });

        const dataArray = await Promise.all(promises);
        const data = dataArray.filter(Boolean); // Remove any undefined elements

        console.log(data);
        return data;
    } catch (error: any) {
        throw new Error("Failed to fetch data from Firestore: " + error.message);
    }
};

export default getData;
