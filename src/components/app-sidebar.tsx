"use client"

import * as React from "react"
import { useState } from "react"
import {
  Leaf,
  Bug,
  Snail,
  Mountain,
  CloudRain,
  Droplet,
  ChevronDown,
  ChevronRight,
  Search,
  X,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const categoryData = {
  categories: [
    {
      title: "Agricultural Chemicals",
      color: "blue",
      subcategories: [
        {
          title: "Herbicides",
          icon: Leaf,
          subcategories: [
            { 
              title: "Triazines" 
            },
            { title: "Chloroacetamides" },
            { title: "Growth Regulators" },
            { title: "Other Herbicides" }
          ]
        },
        {
          title: "Insecticides",
          icon: Bug,
          subcategories: [
            { title: "Neonicotinoids" },
            { title: "Organophosphates" },
            { title: "Growth Regulators" },
            { title: "Other Insecticides" }
          ]
        },
        {
          title: "Fungicides",
          icon: Snail,
          subcategories: [
            { title: "Triazoles" },
            { title: "Strobilurins" },
            { title: "Other Fungicides" }
          ]
        }
      ]
    },
    {
      title: "Environmental Hazards",
      color: "green",
      subcategories: [
        {
          title: "Meteorological Hazards",
          icon: CloudRain,
          subcategories: [
            { title: "Wind-related" },
            { title: "Precipitation-related" },
            { title: "Other Meteorological Hazards" }
          ]
        },
        {
          title: "Hydrological Hazards",
          icon: Droplet,
          subcategories: [
            { title: "Flooding" },
            { title: "Water Scarcity" }
          ]
        },
        {
          title: "Geological Hazards",
          icon: Mountain,
          subcategories: [
            { title: "Land Movement" },
            { title: "Tectonic Activity" }
          ]
        }
      ]
    },
    {
      title: "Air Quality",
      color: "purple",
      subcategories: [
        { title: "Nitrogen Dioxide (NO2)" },
        { title: "Sulfur Dioxide (SO2)" },
        { title: "Carbon Monoxide (CO)" },
        { title: "Ozone (O3)" }
      ]
    }
  ]
}

export function AppSidebar({ ...props }) {
  // track which categories and subcategories are expanded
  const [expandedCategories, setExpandedCategories] = useState(
    categoryData.categories.map((_, idx) => idx)
  )
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({})

  // track current search and currently matching categories
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(categoryData.categories)

  // toggle expansion of category
  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  // toggle expansion of subcategory
  const toggleSubcategory = (categoryIndex: number, subcategoryIndex: number) => {
    const key = `${categoryIndex}-${subcategoryIndex}`
    setExpandedSubcategories((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }
      
  // check if all tertiary subcategories are expanded
  const isEverythingExpanded = () => {
    // check if all primary categories are expanded
    if (expandedCategories.length !== categoryData.categories.length) {
      return false
    }

    // check if all secondary subcategories are expanded
    let has_all_tertiary_expanded = true
    
    for (let i = 0; i < categoryData.categories.length; i++) {
      const category = categoryData.categories[i]
  
      for (let j = 0; j < category.subcategories.length; j++) {
        const subcategory = category.subcategories[j]
        // check if secondary subcategory has tertiary subcategories
        if ("subcategories" in subcategory && Array.isArray(subcategory.subcategories) && subcategory.subcategories.length > 0) {
          const key = `${i}-${j}`
          if (!expandedSubcategories[key]) {
            has_all_tertiary_expanded = false
            break
          }
        }
      }
      
      if (!has_all_tertiary_expanded) {
        break
      }
    }

    return has_all_tertiary_expanded;
  }

  // toggle expand all / collapse all
  const toggleExpandCollapse = () => {
    if (isEverythingExpanded()) {
      setExpandedSubcategories({})
    } else {
      setExpandedCategories(categoryData.categories.map((_, idx) => idx))

      const allExpanded: Record<string, boolean> = {}
      categoryData.categories.forEach((category, index) => {
        category.subcategories.forEach((subcategory, subindex) => {
          if ("subcategories" in subcategory && Array.isArray(subcategory.subcategories) && subcategory.subcategories.length > 0) {
            const key = `${index}-${subindex}`
            allExpanded[key] = true
          }
        })
      })
      setExpandedSubcategories(allExpanded)
    }
  }

  // get category color class based on color prop
  const getCategoryColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "green":
        return "bg-green-100 text-green-700 border-green-300"
      case "purple":
        return "bg-purple-100 text-purple-700 border-purple-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  // handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // handle search 'Enter' key press
  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      performSearch()
    }
  }

  // clear search
  const clearSearch = () => {
    setSearchTerm("")
    setFilteredCategories(categoryData.categories)
  }

  // perform search filtering
  const performSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categoryData.categories)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()
    
    // filter categories and their nested subcategories
    const filtered = categoryData.categories
      .map(category => {
        const category_matches = category.title.toLowerCase().includes(searchTermLower)
        
        // filter secondary subcategories
        const matching_subcategories = category.subcategories
          .map(subcategory => {
            const subcategory_matches = subcategory.title.toLowerCase().includes(searchTermLower)
            
            // filter tertiary subcategories if present
            let matching_tertiary_items: { title: string }[] = []
            if ("subcategories" in subcategory && subcategory.subcategories) {
              matching_tertiary_items = subcategory.subcategories.filter(tertiary =>
                tertiary.title.toLowerCase().includes(searchTermLower)
              )
            }
            
            if (subcategory_matches || matching_tertiary_items.length > 0) {
              return {
                ...subcategory,
                subcategories: "subcategories" in subcategory ? matching_tertiary_items : undefined
              }
            }
            return null
          })
          .filter(Boolean)
        
        if (category_matches || matching_subcategories.length > 0) {
          return {
            ...category,
            subcategories: matching_subcategories
          }
        }
        return null
      })
      .filter(Boolean)
    
    setFilteredCategories(filtered.filter((category) => category !== null) as typeof categoryData.categories)
    
    // auto-expand categories and subcategories with matches
    if (filtered.length > 0) {
      setExpandedCategories(filtered.map((_, idx) => idx))
      
      const new_expanded_subcategories = { ...expandedSubcategories }
      filtered.forEach((category, categoryIndex) => {
        category?.subcategories?.forEach((subcategory, subcategoryIndex) => {
          if (subcategory && "subcategories" in subcategory && (subcategory.subcategories?.length ?? 0) > 0) {
            const key = `${categoryIndex}-${subcategoryIndex}`
            new_expanded_subcategories[key] = true
          }
        })
      })
      setExpandedSubcategories(new_expanded_subcategories)
    }
  }

  // update filtering if search terms change
  React.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCategories(categoryData.categories)
    } else {
      performSearch()
    }
  }, [searchTerm])

  return (
    <div className="relative h-[calc(100svh-var(--header-height))]">

      {/* Sidebar Content Region */}
      <div className="flex flex-col h-full w-full">

        {/* Header Region */}
        <div className="flex-shrink-0 bg-sidebar border-b z-10 px-4 py-3">
          
          {/* Search Field */}
          <div className="relative mb-3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 pr-8 h-9 text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
            />
            {searchTerm && (
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Expand/Collapse All */}
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClickCapture={() => toggleExpandCollapse()}
              className="text-xs w-full"
            >
              {isEverythingExpanded() ? "Collapse All" : "Expand All"}
            </Button>
          </div>
        </div>

        {/* Scrollable Content Region */}
        <div className="flex-grow overflow-y-auto">
          <Sidebar
            collapsible="none"
            className="!h-auto !static top-auto !border-none"
            {...props}
          >
            <SidebarContent className="!overflow-visible">
              <SidebarMenu className="pt-2">
                {categoryData.categories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-2">

                    {/* Primary Categories */}
                    <SidebarMenuItem className={`flex items-center px-2 py-1.5 hover:bg-muted/50 rounded-md ${getCategoryColorClass(category.color)}`}>
                      <button
                        // toggle category expansion
                        onClick={() => toggleCategory(categoryIndex)}
                        className="flex items-center w-full"
                      >
                        {expandedCategories.includes(categoryIndex) ? (
                          <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
                        )}
                        <span className="font-medium">{category.title}</span>
                      </button>
                    </SidebarMenuItem>

                    {/* Subcategories */}
                    {expandedCategories.includes(categoryIndex) && (
                      <div className="mt-1">
                        {category.subcategories.map((subcategory, subcategoryIndex) => (
                          <div key={subcategoryIndex} className="mb-1">

                            {/*  Secondary Subcategory */}
                            <div 
                              className={`flex items-center px-2 py-1.5 hover:bg-muted/50 rounded-md ${getCategoryColorClass(category.color)} mb-1`}
                            >
                              {"subcategories" in subcategory ? (
                                <button
                                  onClick={() => toggleSubcategory(categoryIndex, subcategoryIndex)}
                                  className="flex items-center w-full"
                                >
                                  {expandedSubcategories[`${categoryIndex}-${subcategoryIndex}`] ? (
                                    <ChevronDown className="h-3.5 w-3.5 mr-1" />
                                  ) : (
                                    <ChevronRight className="h-3.5 w-3.5 mr-1" />
                                  )}
                                  {<subcategory.icon className="h-4 w-4 mr-2" />}
                                  <span className="text-sm">{subcategory.title}</span>
                                </button>
                              ) : (
                                <span className="text-sm ml-5">{subcategory.title}</span>
                              )}
                            </div>
                            
                            {/* Tertiary Subcategory */}
                            {"subcategories" in subcategory && expandedSubcategories[`${categoryIndex}-${subcategoryIndex}`] && (
                              <div className="mt-1">
                                {subcategory.subcategories.map((tertiarySubcategory, tertiaryIndex) => (
                                  <div 
                                    key={tertiaryIndex} 
                                    className={`flex items-center px-2 py-1 text-sm hover:bg-muted/50 rounded-md mb-0.5 ${getCategoryColorClass(category.color)}`}
                                    >
                                    <span className="text-sm ml-5">{tertiarySubcategory.title}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* TODO Display filter options for each tertiary subcategory*/}

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
       </div>
    </div>
  )
}
