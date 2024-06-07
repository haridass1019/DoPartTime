import { collection, doc, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, where } from "firebase/firestore";
import { db } from "../app/firbaseconfig"; // Adjust the path to your Firebase config


interface JobData {
    id: string;
    [key: string]: any; // Adjust the structure according to your actual job data
}

const getDatatrendingcate = async () => {

    try {
        const categoriesSnapshot = await getDocs(collection(db, 'category'));
        const categories = [];

        for (const doc of categoriesSnapshot.docs) {
            const data = doc.data();
            const categoryRef = doc.ref;
            const jobsQuery = query(collection(db, 'jobs'), where('category', 'array-contains', categoryRef), where('status', '!=', 0));
            const jobsSnapshot = await getDocs(jobsQuery);
            const jobCount = jobsSnapshot.size;
            console.log('----------');
            console.log(jobCount);
            console.log('----------');
            categories.push({
                id: doc.id,
                name: data.name,
                jobCount,
            });
        }

        return categories;
    } catch (error: any) {
        throw new Error("Failed to fetch data from Firestore: " + error.message);
    }
};

export default getDatatrendingcate;
