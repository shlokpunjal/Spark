import { useState, useEffect, useCallback } from "react";

type FetchState<T> = {
    data: T | null
    loading: boolean
    error: string | null
    refetch: ()=> void
}

export function useFetch<T>(url: string): FetchState<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [refetchIndex, setRefetchIndex] = useState(0)

    useEffect(() => {
        let isCancelled = false

        async function fetchData() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url)

                if(!response.ok){
                    throw new Error(`HTTP error: ${response.status}`)
                }

                const json = await response.json()

                if (!isCancelled) {
                    setData(json)
                }
            } catch (err) {
                if(!isCancelled) {
                    setError(err instanceof Error ? err.message : "Something went wrong")
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            isCancelled = true
        }
    }, [url, refetchIndex])

    const refetch = useCallback(() => {
        setRefetchIndex(prev => prev + 1)
    }, [])

    return { data, loading, error, refetch }
}