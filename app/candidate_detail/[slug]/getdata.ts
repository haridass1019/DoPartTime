import { collection, doc, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, where } from "firebase/firestore";
import { db } from "../../firbaseconfig"; // Adjust the path to your Firebase config

interface GetDataParams {
    slug?: any;
}

interface Data {
    id: string;
    [key: string]: any; // Adjust the structure according to your actual job data
}

const pagination_size = 10; // Set your pagination size

const getData = async ({ slug }: GetDataParams): Promise<Data[] | any> => {

    try {


        const docRef = doc(db, 'users', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();

            return { userData };
        }
    } catch (error: any) {
        throw new Error("Failed to fetch data from Firestore: " + error.message);
    }
};

export default getData;
