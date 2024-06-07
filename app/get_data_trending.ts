import { collection, doc, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, where } from "firebase/firestore";
import { db } from "../app/firbaseconfig"; // Adjust the path to your Firebase config



interface JobData {
    id: string;
    [key: string]: any; // Adjust the structure according to your actual job data
}

const pagination_size = 2; // Set your pagination size

const getDatatrending = async (): Promise<JobData[] | any> => {

    try {

        const queryConstraints: QueryConstraint[] = [];
        queryConstraints.push(where('status', '!=', 0));
        queryConstraints.push(orderBy('status', 'asc'));
        queryConstraints.push(orderBy('publish_time', 'desc'));

        queryConstraints.push(limit(10));

        const postsRef = query(collection(db, "jobs"), ...queryConstraints);
        const querySnapshot = await getDocs(postsRef);



        const promises = querySnapshot.docs.map(async (doc) => {
            let companyname: any;

            const companyDocSnap = await getDoc(doc.data().company);
            if (companyDocSnap.exists()) {
                const companyData = companyDocSnap.data();
                companyname = companyData;

            }
            const data: JobData = { id: doc.id, ...doc.data(), companyname: companyname };
            // console.log('fffffffffffff', data)
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

export default getDatatrending;
