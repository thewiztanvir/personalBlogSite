import React from 'react';
import Card from './components/Card';
import useAirtable from './useAirtable';

const App = () => {
  const idToFetch = 1; // Change this ID to fetch different records
  const { data, loading, error } = useAirtable(idToFetch);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Sort the data by id in ascending order
  const sortedData = data.sort((a, b) => a.id - b.id);

  return (
    <div>
      <h1 className='text-center font-4xl font-bold'>My Airtable App</h1>
      <div className="grid grid-cols-3 text-center">
        {sortedData.map(record => (
          <Card
            key={record.id}
            title={record.headerTitle || 'Default Title'} // Fallback title
            cardContent={record.mainParagraph || 'No content available.'} // Fallback content
          />
        ))}
      </div>
    </div>
  );
};

export default App;