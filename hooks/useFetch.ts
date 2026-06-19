import { useState, useEffect } from "react";

type FetchState<T> = {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetch<T>(url: string): FetchState<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
    }, [url])

    return { data, loading, error }
}