// Import React and any other necessary modules
import React from 'react';
import { Metadata } from 'next';

// Define your component
const JobsPage: React.FC = () => {
  // Your component logic here

  return (
    // JSX for your component
    <div>
      <h1>Jobs Page</h1>
      {/* Other JSX elements */}
    </div>
  );
};

// Define the metadata generation function
export async function generateMetadata({
  params,
}: { params: { id: any } }): Promise<Metadata> {
  return {
    title: 'hai',
    description: 'post.body',
    openGraph: {
      images: [
        {
          url: 'post.imageUrl',
        },
      ],
    },
  };
}
export default JobsPage;
