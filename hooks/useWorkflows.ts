import { useState, useMemo, useCallback } from 'react'
import type { Workflow } from '../types/workflow'

interface UseWorkflowsReturn {
  workflows: Workflow[]
  filteredWorkflows: Workflow[]
  paginatedWorkflows: Workflow[]
  currentPage: number
  totalPages: number
  searchQuery: string
  selectedImportance: string | null
  isLoading: boolean
  setSearchQuery: (query: string) => void
  setSelectedImportance: (importance: string | null) => void
  setCurrentPage: (page: number) => void
  resetFilters: () => void
  getWorkflowById: (id: string) => Workflow | undefined
  totalWorkflows: number
  showingFrom: number
  showingTo: number
}

const ITEMS_PER_PAGE = 12

export function useWorkflows(allWorkflows: Workflow[]): UseWorkflowsReturn {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImportance, setSelectedImportance] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const filteredWorkflows = useMemo(() => {
    const results = allWorkflows.filter((workflow) => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesImportance = !selectedImportance || workflow.importance === selectedImportance
      return matchesSearch && matchesImportance
    })
    return results
  }, [allWorkflows, searchQuery, selectedImportance])

  const totalPages = Math.ceil(filteredWorkflows.length / ITEMS_PER_PAGE)

  const paginatedWorkflows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredWorkflows.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredWorkflows, currentPage])

  const handleSearch = useCallback((query: string) => {
    setIsLoading(true)
    setSearchQuery(query)
    setCurrentPage(1)
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  const handleImportanceFilter = useCallback((importance: string | null) => {
    setIsLoading(true)
    setSelectedImportance(importance)
    setCurrentPage(1)
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedImportance(null)
    setCurrentPage(1)
  }, [])

  const getWorkflowById = useCallback((id: string) => {
    return allWorkflows.find(w => w.id === id)
  }, [allWorkflows])

  const showingFrom = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, filteredWorkflows.length)

  return {
    workflows: allWorkflows,
    filteredWorkflows,
    paginatedWorkflows,
    currentPage,
    totalPages,
    searchQuery,
    selectedImportance,
    isLoading,
    setSearchQuery: handleSearch,
    setSelectedImportance: handleImportanceFilter,
    setCurrentPage,
    resetFilters,
    getWorkflowById,
    totalWorkflows: filteredWorkflows.length,
    showingFrom,
    showingTo
  }
}