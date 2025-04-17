import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounce } from './useDebounce'

export function useVirtualizedSearchList<T>(
  list: T[],
  searchFn: (item: T, query: string) => boolean,
  batchSize = 30
) {
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(batchSize)
  const listRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(searchQuery)

  const filteredItems = useMemo(() => {
    if (!Array.isArray(list)) return []
    return list.filter(item => searchFn(item, debouncedQuery))
  }, [list, debouncedQuery, searchFn])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const handleScroll = () => {
    const listEl = listRef.current
    if (!listEl) return

    const nearBottom =
      listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight - 20

    if (nearBottom && hasMore) {
      setVisibleCount(prev => Math.min(prev + batchSize, filteredItems.length))
    }
  }

  useEffect(() => {
    setVisibleCount(batchSize)
  }, [batchSize])

  return {
    listRef,
    searchQuery,
    setSearchQuery,
    visibleItems,
    handleScroll,
    hasMore,
  }
}
