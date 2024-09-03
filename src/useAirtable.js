import { useEffect, useState } from 'react';

const useAirtable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Replace with your actual Airtable credentials
    const BASE_ID = 'app7wnT4t0rtmjKf9'; // Your Airtable Base ID
    const PAT = 'patpt3JsqveR1vQFB.8cc56cadb541ccdf8daa9ab800a649ad1bb6322812b6f72e99a1867b07ae13d1'; // Your Airtable Personal Access Token
    const TABLE_NAME = 'records'; // Your Airtable Table Name

    useEffect(() => {
        const fetchData = async () => {
            try {
                let allRecords = [];
                let offset;

                do {
                    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?offset=${offset || ''}`, {
                        headers: {
                            Authorization: `Bearer ${PAT}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    allRecords = allRecords.concat(result.records.map(record => ({
                        id: record.id,
                        ...record.fields
                    })));
                    offset = result.offset; // Update offset for the next request
                } while (offset); // Continue fetching until there are no more records

                setData(allRecords);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [BASE_ID, PAT, TABLE_NAME]);

    return { data, loading, error };
};

export default useAirtable;