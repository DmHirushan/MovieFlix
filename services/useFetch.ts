import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, serData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            serData(result);
        } catch (error) {
            // @ts-ignore
            setError(error instanceof Error ? error : new Error('An error occurred'));
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        serData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    }, []);

    return { data, loading, error, refetch: fetchData, reset };

}

export default useFetch;