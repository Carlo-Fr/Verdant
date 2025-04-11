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
import { set } from "zod"
import { Checkbox } from "@/components/ui/checkbox"

interface Filter {
  id: string
  label: string
}

interface QuaternarySubcategory {
  title: string
  filters: Filter[];
}

interface TertiarySubcategory {
  title: string
  subcategories?: QuaternarySubcategory[]
}

interface SecondarySubcategory {
  title: string
  icon?: React.ComponentType<any>
  subcategories?: TertiarySubcategory[]
  filters?: Filter[]
}

interface Category {
  title: string
  color: string
  subcategories: SecondarySubcategory[]
}

interface CategoryData {
  categories: Category[]
}


const categoryData: CategoryData = {
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
              title: "Triazines",
              subcategories: [
                { 
                  title: "atrazine", 
                  filters: [
                    { id: "atrazine-low", label: "Low Estimate (kg)" },
                    { id: "atrazine-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "propazine", 
                  filters: [
                    { id: "propazine-low", label: "Low Estimate (kg)" },
                    { id: "propazine-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "simazine", 
                  filters: [
                    { id: "simazine-low", label: "Low Estimate (kg)" },
                    { id: "simazine-high", label: "High Estimate (kg)" }
                  ]
                }
              ]
            },
            { 
              title: "Chloroacetamides",
              subcategories: [
                { 
                  title: "acetochlor", 
                  filters: [
                    { id: "acetochlor-low", label: "Low Estimate (kg)" },
                    { id: "acetochlor-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "dimethenamid", 
                  filters: [
                    { id: "dimethenamid-low", label: "Low Estimate (kg)" },
                    { id: "dimethenamid-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "dimethenamid-p", 
                  filters: [
                    { id: "dimethenamid-p-low", label: "Low Estimate (kg)" },
                    { id: "dimethenamid-p-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "dimethenamid & dimethenamid-p", 
                  filters: [
                    { id: "dimethenamid-and-dimethenamid-p-low", label: "Low Estimate (kg)" },
                    { id: "dimethenamid-and-dimethenamid-p-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "metolachlor", 
                  filters: [
                    { id: "metolachlor-low", label: "Low Estimate (kg)" },
                    { id: "metolachlor-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "metolachlor-s", 
                  filters: [
                    { id: "metolachlor-s-low", label: "Low Estimate (kg)" },
                    { id: "metolachlor-s-high", label: "High Estimate (kg)" }
                  ]
                },
                { 
                  title: "metolachlor & metolachlor-s", 
                  filters: [
                    { id: "metolachlor-and-metolachlor-s-low", label: "Low Estimate (kg)" },
                    { id: "metolachlor-and-metolachlor-s-high", label: "High Estimate (kg)" }
                  ]
                },

              ]
            },
            { 
              title: "Growth Regulators",
              subcategories: [
                { 
                  title: "2,4-D", 
                  filters: [
                    { id: "2-4-d-low", label: "Low Estimate (kg)" },
                    { id: "2-4-d-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "dicamba",
                  filters: [
                    { id: "dicamba-low", label: "Low Estimate (kg)" },
                    { id: "dicamba-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "trichlopyr",
                  filters: [
                    {id: "trichlopyr-low", label: "Low Estimate (kg)" },
                    {id: "trichlopyr-high", label: "High Estimate (kg)"}
                  ]
                },
              ]
            },
            { 
              title: "Other Herbicides",
              subcategories: [
                { 
                  title: "bentazone", 
                  filters: [
                    { id: "bentazone-low", label: "Low Estimate (kg)" },
                    { id: "bentazone-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "bromacil",
                  filters: [
                    { id: "bromacil-low", label: "Low Estimate (kg)" },
                    { id: "bromacil-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "bromoxynil",
                  filters: [
                    { id: "bromoxynil-low", label: "Low Estimate (kg)" },
                    { id: "bromoxynil-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "chlorimuron",
                  filters: [
                    {id: "chlorimuron-low", label: "Low Estimate (kg)" },
                    {id: "chlorimuron-high", label: "High Estimate (kg)"}
                  ]
                },
                {
                  title: "diuron",
                  filters: [
                    { id: "diuron-low", label: "Low Estimate (kg)" },
                    { id: "diuron-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "fluometuron",
                  filters: [
                    { id: "fluometuron-low", label: "Low Estimate (kg)" },
                    { id: "fluometuron-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "glyphosate",
                  filters: [
                    { id: "glyphosate-low", label: "Low Estimate (kg)" },
                    { id: "glyphosate-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "halosulfuron",
                  filters: [
                    { id: "halosulfuron-low", label: "Low Estimate (kg)" },
                    { id: "halosulfuron-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "hexazinone",
                  filters: [
                    { id: "hexazinone-low", label: "Low Estimate (kg)" },
                    { id: "hexazinone-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "imazethapyr",
                  filters: [
                    { id: "imazethapyr-low", label: "Low Estimate (kg)" },
                    { id: "imazethapyr-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "linuron",
                  filters: [
                    { id: "linuron-low", label: "Low Estimate (kg)" },
                    { id: "linuron-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "metribuzin",
                  filters: [
                    { id: "metribuzin-low", label: "Low Estimate (kg)" },
                    { id: "metribuzin-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "oryzalin",
                  filters: [
                    { id: "oryzalin-low", label: "Low Estimate (kg)" },
                    { id: "oryzalin-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "sulfentrazone",
                  filters: [
                    { id: "sulfentrazone-low", label: "Low Estimate (kg)" },
                    { id: "sulfentrazone-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "tebuthiuron",
                  filters: [
                    { id: "tebuthiuron-low", label: "Low Estimate (kg)" },
                    { id: "tebuthiuron-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "thiobencarb",
                  filters: [
                    { id: "thiobencarb-low", label: "Low Estimate (kg)" },
                    { id: "thiobencarb-high", label: "High Estimate (kg)" }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Insecticides",
          icon: Bug,
          subcategories: [
            { 
              title: "Neonicotinoids",
              subcategories: [
                { 
                  title: "acetamiprid", 
                  filters: [
                    { id: "acetamiprid-low", label: "Low Estimate (kg)" },
                    { id: "acetamiprid-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "clothianidin",
                  filters: [
                    {id: "clothianidin-low", label: "Low Estimate (kg)" },
                    {id: "clothianidin-high", label: "High Estimate (kg)"}
                  ]
                },
                {
                  title: "dinotefuran",
                  filters: [
                    { id: "dinotefuran-low", label: "Low Estimate (kg)" },
                    { id: "dinotefuran-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "imidacloprid",
                  filters: [
                    { id: "imidacloprid-low", label: "Low Estimate (kg)" },
                    { id: "imidacloprid-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "thiamethoxam",
                  filters: [
                    { id: "thiamethoxam-low", label: "Low Estimate (kg)" },
                    { id: "thiamethoxam-high", label: "High Estimate (kg)" }
                  ]
                }
              ]
            },
            {
              title: "Organophosphates",
              subcategories: [
                { 
                  title: "acephate", 
                  filters: [
                    { id: "acephate-low", label: "Low Estimate (kg)" },
                    { id: "acephate-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "chlorpyrifos",
                  filters: [
                    { id: "chlorpyrifos-low", label: "Low Estimate (kg)" },
                    { id: "chlorpyrifos-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "diazinon",
                  filters: [
                    { id: "diazinon-low", label: "Low Estimate (kg)" },
                    { id: "diazinon-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "dicrotophos",
                  filters: [
                    { id: "dicrotophos-low", label: "Low Estimate (kg)" },
                    { id: "dicrotophos-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "dimethoate",
                  filters: [
                    { id: "dimethoate-low", label: "Low Estimate (kg)" },
                    { id: "dimethoate-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "ethoprophos",
                  filters: [
                    { id: "ethoprophos-low", label: "Low Estimate (kg)" },
                    { id: "ethoprophos-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "malathion",
                  filters: [
                    { id: "malathion-low", label: "Low Estimate (kg)" },
                    { id: "malathion-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "tebupirimphos",
                  filters: [
                    { id: "tebupirimphos-low", label: "Low Estimate (kg)" },
                    { id: "tebupirimphos-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "terbufos",
                  filters: [
                    { id:"terbufos-low", label:"Low Estimate (kg)" },
                    { id:"terbufos-high", label:"High Estimate (kg)"}
                  ]
                }
              ]
            },
            {
              title: "Growth Regulators",
              subcategories: [
                { 
                  title: "diflubenzuron", 
                  filters: [
                    { id: "diflubenzuron-low", label: "Low Estimate (kg)" },
                    { id: "diflubenzuron-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "etoxazole",
                  filters: [
                    { id: "etoxazole-low", label: "Low Estimate (kg)" },
                    { id: "etoxazole-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "methoxyfenozide",
                  filters: [
                    { id: "methoxyfenozide-low", label: "Low Estimate (kg)" },
                    { id: "methoxyfenozide-high", label: "High Estimate (kg)" }
                  ]
                }
              ]
            },
            {
              title: "Other Insecticides",
              subcategories: [
                {
                  title: "carbaryl",
                  filters: [
                    { id: "carbaryl-low", label: "Low Estimate (kg)" },
                    { id: "carbaryl-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "chlorantraniliprole",
                  filters: [
                    { id: "chlorantraniliprole-low", label: "Low Estimate (kg)" },
                    { id: "chlorantraniliprole-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "cyantraniliprole",
                  filters: [
                    { id: "cyantraniliprole-low", label: "Low Estimate (kg)" },
                    { id: "cyantraniliprole-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "fipronil",
                  filters: [
                    { id: "fipronil-low", label: "Low Estimate (kg)" },
                    { id: "fipronil-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "methomyl",
                  filters: [
                    { id: "methomyl-low", label: "Low Estimate (kg)" },
                    { id: "methomyl-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "permethrin",
                  filters: [
                    { id:"permethrin-low", label:"Low Estimate (kg)" },
                    { id:"permethrin-high", label:"High Estimate (kg)"}
                  ]
                },
                {
                  title: "piperonyl butoxide",
                  filters: [
                    { id:"piperonyl-butoxide-low", label:"Low Estimate (kg)" },
                    { id:"piperonyl-butoxide-high", label:"High Estimate (kg)"}
                  ]
                },
                {
                  title: "sulfoxaflor",
                  filters: [
                    { id:"sulfoxaflor-low", label:"Low Estimate (kg)" },
                    { id:"sulfoxaflor-high", label:"High Estimate (kg)"}
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Fungicides",
          icon: Snail,
          subcategories: [
            { 
              title: "Triazoles",
              subcategories: [
                { 
                  title: "metconazole", 
                  filters: [
                    { id: "metconazole-low", label: "Low Estimate (kg)" },
                    { id: "metconazole-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "myclobutanil",
                  filters: [
                    { id: "myclobutanil-low", label: "Low Estimate (kg)" },
                    { id: "myclobutanil-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "propiconazole",
                  filters: [
                    { id: "propiconazole-low", label: "Low Estimate (kg)" },
                    { id: "propiconazole-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "tebuconazole",
                  filters: [
                    { id: "tebuconazole-low", label: "Low Estimate (kg)" },
                    { id: "tebuconazole-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "tetraconazole",
                  filters: [
                    { id: "tetraconazole-low", label: "Low Estimate (kg)" },
                    { id: "tetraconazole-high", label: "High Estimate (kg)" }
                  ]
                }
              ]
            },
            {
              title: "Strobilurins",
              subcategories: [
                {
                  title: "azoxystrobin",
                  filters: [
                    { id: "azoxystrobin-low", label: "Low Estimate (kg)"},
                    { id: "azoxystrobin-high", label: "High Estimate (kg)"}
                  ]
                },
                {
                  title: "pyraclostrobin",
                  filters: [
                    { id: "pyraclostrobin-low", label: "Low Estimate (kg)" },
                    { id: "pyraclostrobin-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "trifloxystrobin",
                  filters: [
                    { id: "trifloxystrobin-low", label: "Low Estimate (kg)" },
                    { id: "trifloxystrobin-high", label: "High Estimate (kg)" }
                  ]
                }
              ]
            },
            {
              title: "Other Fungicides",
              subcategories: [
                {
                  title: "benzovindiflupry",
                  filters: [
                    { id: "benzovindiflupry-low", label: "Low Estimate (kg)" },
                    { id: "benzovindiflupry-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "boscalid",
                  filters: [
                    { id: "boscalid-low", label: "Low Estimate (kg)" },
                    { id: "boscalid-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "cyprodinil",
                  filters: [
                    { id: "cyprodinil-low", label: "Low Estimate (kg)" },
                    { id: "cyprodinil-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "dimethomorph",
                  filters: [
                    { id: "dimethomorph-low", label: "Low Estimate (kg)" },
                    { id: "dimethomorph-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "fluopicolide",
                  filters: [
                    { id: "fluopicolide-low", label: "Low Estimate (kg)" },
                    { id: "fluopicolide-high", label: "High Estimate (kg)" }
                  ]
                },
                {
                  title: "metalaxyl",
                  filters: [
                    { id:"metalaxyl-low", label:"Low Estimate (kg)" },
                    { id:"metalaxyl-high", label:"High Estimate (kg)"}
                  ]
                },
                {
                  title: "pyrimethanil",
                  filters: [
                    { id:"pyrimethanil-low", label:"Low Estimate (kg)" },
                    { id:"pyrimethanil-high", label:"High Estimate (kg)"}
                  ]
                }
              ]
            }
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
            { 
              title: "Wind-related",
              subcategories: [
                { 
                  title: "Hurricane", 
                  filters: [
                    { id: "hurricane-freq", label: "Annualized Frequency" },
                    { id: "hurricane-bldg", label: "Exposure - Building Value" },
                    { id: "hurricane-pop", label: "Exposure - Population" },
                    { id: "hurricane-loss", label: "Expected Annual Loss - Total" },
                    { id: "hurricane-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                { 
                  title: "Tornado", 
                  filters: [
                    { id: "tornado-freq", label: "Annualized Frequency" },
                    { id: "tornado-bldg", label: "Exposure - Building Value" },
                    { id: "tornado-pop", label: "Exposure - Population" },
                    { id: "tornado-loss", label: "Expected Annual Loss - Total" },
                    { id: "tornado-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Strong Wind",
                  filters: [
                    { id: "strong-wind-freq", label: "Annualized Frequency" },
                    { id: "strong-wind-bldg", label: "Exposure - Building Value" },
                    { id: "strong-wind-pop", label: "Exposure - Population" },
                    { id: "strong-wind-loss", label: "Expected Annual Loss - Total" },
                    { id: "strong-wind-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                }
              ]
            },
            {
              title: "Precipitation-related",
              subcategories: [
                { 
                  title: "Hail", 
                  filters: [
                    { id: "hail-freq", label: "Annualized Frequency" },
                    { id: "hail-bldg", label: "Exposure - Building Value" },
                    { id: "hail-pop", label: "Exposure - Population" },
                    { id: "hail-loss", label: "Expected Annual Loss - Total" },
                    { id: "hail-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                { 
                  title: "Ice Storm", 
                  filters: [
                    { id: "ice-storm-freq", label: "Annualized Frequency" },
                    { id: "ice-storm-bldg", label: "Exposure - Building Value" },
                    { id: "ice-storm-pop", label: "Exposure - Population" },
                    { id: "ice-storm-loss", label: "Expected Annual Loss - Total" },
                    { id: "ice-storm-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Winter Weather",
                  filters: [
                    { id: "winter-weather-freq", label: "Annualized Frequency" },
                    { id: "winter-weather-bldg", label: "Exposure - Building Value" },
                    { id: "winter-weather-pop", label: "Exposure - Population" },
                    { id: "winter-weather-loss", label: "Expected Annual Loss - Total" },
                    { id: "winter-weather-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                }
              ]
            },
            {
              title: "Other Meteorological Hazards",
              subcategories: [
                {
                  title: "Cold Wave",
                  filters: [
                    { id: "cold-wave-freq", label: "Annualized Frequency" },
                    { id: "cold-wave-bldg", label: "Exposure - Building Value" },
                    { id: "cold-wave-pop", label: "Exposure - Population" },
                    { id: "cold-wave-loss", label: "Expected Annual Loss - Total" },
                    { id: "cold-wave-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Heat Wave",
                  filters: [
                    { id: "heat-wave-freq", label: "Annualized Frequency" },
                    { id: "heat-wave-bldg", label: "Exposure - Building Value" },
                    { id: "heat-wave-pop", label: "Exposure - Population" },
                    { id: "heat-wave-loss", label: "Expected Annual Loss - Total" },
                    { id: "heat-wave-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Lightning",
                  filters: [
                    { id: "lightning-freq", label: "Annualized Frequency" },
                    { id: "lightning-bldg", label: "Exposure - Building Value" },
                    { id: "lightning-pop", label: "Exposure - Population" },
                    { id: "lightning-loss", label: "Expected Annual Loss - Total" },
                    { id: "lightning-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Hydrological Hazards",
          icon: Droplet,
          subcategories: [
            { 
              title: "Flooding",
              subcategories: [
                { 
                  title: "Riverine", 
                  filters: [
                    { id: "riverine-freq", label: "Annualized Frequency" },
                    { id: "riverine-bldg", label: "Exposure - Building Value" },
                    { id: "riverine-pop", label: "Exposure - Population" },
                    { id: "riverine-loss", label: "Expected Annual Loss - Total" },
                    { id: "riverine-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Coastal",
                  filters: [
                    { id: "coastal-freq", label: "Annualized Frequency" },
                    { id: "coastal-bldg", label: "Exposure - Building Value" },
                    { id: "coastal-pop", label: "Exposure - Population" },
                    { id: "coastal-loss", label: "Expected Annual Loss - Total" },
                    { id: "coastal-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                }
              ]
            },
            {
              title: "Water Scarcity",
              subcategories: [
                { 
                  title: "Drought", 
                  filters: [
                    { id: "drought-freq", label: "Annualized Frequency" },
                    { id: "drought-agri", label: "Exposure - Agriculture Value" },
                    { id: "drought-loss", label: "Expected Annual Loss - Total" },
                    { id: "drought-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Wildfire",
                  filters: [
                    { id: "wildfire-freq", label: "Annualized Frequency" },
                    { id: "wildfire-bldg", label: "Exposure - Building Value" },
                    { id: "wildfire-pop", label: "Exposure - Population" },
                    { id: "wildfire-loss", label: "Expected Annual Loss - Total" },
                    { id: "wildfire-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Geological Hazards",
          icon: Mountain,
          subcategories: [
            { 
              title: "Land Movement",
              subcategories: [
                { 
                  title: "Avalanche", 
                  filters: [
                    { id: "avalanche-freq", label: "Annualized Frequency" },
                    { id: "avalanche-bldg", label: "Exposure - Building Value" },
                    { id: "avalanche-pop", label: "Exposure - Population" },
                    { id: "avalanche-loss", label: "Expected Annual Loss - Total" },
                    { id: "avalanche-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Landslide",
                  filters: [
                    { id: "landslide-freq", label: "Annualized Frequency" },
                    { id: "landslide-bldg", label: "Exposure - Building Value" },
                    { id: "landslide-pop", label: "Exposure - Population" },
                    { id: "landslide-loss", label: "Expected Annual Loss - Total" },
                    { id: "landslide-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                }
              ]
            },
            {
              title: "Tectonic Activity",
              subcategories: [
                {
                  title: "Earthquake",
                  filters: [
                    { id: "earthquake-freq", label: "Annualized Frequency" },
                    { id: "earthquake-bldg", label: "Exposure - Building Value" },
                    { id: "earthquake-pop", label: "Exposure - Population" },
                    { id: "earthquake-loss", label: "Expected Annual Loss - Total" },
                    { id: "earthquake-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Volcanic",
                  filters: [
                    { id: "volcanic-freq", label: "Annualized Frequency" },
                    { id: "volcanic-bldg", label: "Exposure - Building Value" },
                    { id: "volcanic-pop", label: "Exposure - Population" },
                    { id: "volcanic-loss", label: "Expected Annual Loss - Total" },
                    { id: "volcanic-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                },
                {
                  title: "Tsunami",
                  filters: [
                    { id: "tsunami-freq", label: "Annualized Frequency" },
                    { id: "tsunami-bldg", label: "Exposure - Building Value" },
                    { id: "tsunami-pop", label: "Exposure - Population" },
                    { id: "tsunami-loss", label: "Expected Annual Loss - Total" },
                    { id: "tsunami-risk", label: "Hazard Type Risk Index Rating" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Air Quality",
      color: "purple",
      subcategories: [
        { 
          title: "Nitrogen Dioxide (NO2)",
          filters: [
            { id: "no2-mean", label: "Mean (ppb)" },
            { id: "no2-max", label: "1st Max Value" },
            { id: "no2-aqi", label: "AQI" },
            { id: "no2-hour", label: "1st Max Hour" }
          ]
        },
        { 
          title: "Sulfur Dioxide (SO2)",
          filters: [
            { id: "so2-mean", label: "Mean (ppb)" },
            { id: "so2-max", label: "1st Max Value" },
            { id: "so2-aqi", label: "AQI" },
            { id: "so2-hour", label: "1st Max Hour" }
          ]
        },
        { 
          title: "Carbon Monoxide (CO)",
          filters: [
            { id: "co-mean", label: "Mean (ppb)" },
            { id: "co-max", label: "1st Max Value" },
            { id: "co-aqi", label: "AQI" },
            { id: "co-hour", label: "1st Max Hour" }
          ]
        },
        { 
          title: "Ozone (O3)",
          filters: [
            { id: "o3-mean", label: "Mean (ppb)" },
            { id: "o3-max", label: "1st Max Value" },
            { id: "o3-aqi", label: "AQI" },
            { id: "o3-hour", label: "1st Max Hour" }
          ]
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }) {
  // track which categories and subcategories are expanded
  const [expandedCategories, setExpandedCategories] = useState<number[]>(
    categoryData.categories.map((_, idx) => idx)
  )

  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({})

  const [expandedTertiarySubcategories, setExpandedTertiarySubcategories] = useState<Record<string, boolean>>({})

  // track filter selections
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({})

  // track current search and currently matching categories
  const [searchTerm, setSearchTerm] = useState("")

  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categoryData.categories)

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

  // toggle expansion of tertiary subcategory
  const toggleTertiarySubcategory = (categoryIndex: number, subcategoryIndex: number, tertiaryIndex: number) => {
    const key = `${categoryIndex}-${subcategoryIndex}-${tertiaryIndex}`
    setExpandedTertiarySubcategories((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // toggle filter selection
  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId]
    }))
  }

  // check if a filter is selected
  const isFilterSelected = (filterId: string) => {
    return !!selectedFilters[filterId]
  }
      
  // check if all tertiary and quaternary subcategories are expanded
  const isEverythingExpanded = () => {
    // check if all primary categories are expanded
    if (expandedCategories.length !== categoryData.categories.length) {
      return false
    }

    // check if all secondary subcategories are expanded
    let has_all_expanded = true
    
    for (let i = 0; i < categoryData.categories.length; i++) {
      const category = categoryData.categories[i]
  
      for (let j = 0; j < category.subcategories.length; j++) {
        const subcategory = category.subcategories[j]

        // check if secondary subcategory has tertiary subcategories
        if ("subcategories" in subcategory && Array.isArray(subcategory.subcategories) && subcategory.subcategories.length > 0) {
          const key = `${i}-${j}`
          if (!expandedSubcategories[key]) {
            has_all_expanded = false
            break
          }

          // check if all tertiary subcategories are expanded
          for (let k = 0; k < subcategory.subcategories.length; k++) {
            const tertiarySubcategory = subcategory.subcategories[k]

            // check if tertiary subcategory has quaternary subcategories
            if ("subcategories" in tertiarySubcategory && Array.isArray(tertiarySubcategory.subcategories) && tertiarySubcategory.subcategories.length > 0) {
              const key = `${i}-${j}-${k}`
              if (!expandedTertiarySubcategories[key]) {
                has_all_expanded = false
                break
              }
            }
          }
        }

        // check if 'Air Quality' subcategory has filters to be expanded
        if ("filters" in subcategory && Array.isArray(subcategory.filters) && subcategory.filters.length > 0) {
          const key = `${i}-${j}`
          if (!expandedSubcategories[key]) {
            has_all_expanded = false
            break
          }
        }
      }
      
      if (!has_all_expanded) {
        break
      }
    }

    return has_all_expanded;
  }

  // TODO UPDATE (Collapsing a parent category should also collapse all of that parents subcategories. 
  //              Currently, expanded subcategories remain expanded when parent category collpases and is expanded again.)
  // toggle expand all / collapse all
  const toggleExpandCollapse = () => {
    if (isEverythingExpanded()) {
      setExpandedSubcategories({})
    } else {
      setExpandedCategories(categoryData.categories.map((_, idx) => idx))

      const allExpanded: Record<string, boolean> = {}
      const allTertiaryExpanded: Record<string, boolean> = {}

      categoryData.categories.forEach((category, index) => {
        category.subcategories.forEach((subcategory, subindex) => {
          // expand subcategories if they have tertiary subcategories
          if ("subcategories" in subcategory && Array.isArray(subcategory.subcategories) && subcategory.subcategories.length > 0) {
            const key = `${index}-${subindex}`
            allExpanded[key] = true

            // expand tertiary subcategories if they have quaternary subcategories
            subcategory.subcategories.forEach((tertiarySubcategory, tertiaryIndex) => {
              if ("subcategories" in tertiarySubcategory && Array.isArray(tertiarySubcategory.subcategories) && tertiarySubcategory.subcategories.length > 0) {
                const key = `${index}-${subindex}-${tertiaryIndex}`
                allTertiaryExpanded[key] = true
              }
            })
          }

          // expand 'Air Quality' subcategories if they have filters
          if ("filters" in subcategory && Array.isArray(subcategory.filters) && subcategory.filters.length > 0) {
            const key = `${index}-${subindex}`
            allExpanded[key] = true
          }
        })
      })

      setExpandedSubcategories(allExpanded)
      setExpandedTertiarySubcategories(allTertiaryExpanded)
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

  // TODO UPDATE THE SEARCH FUNCTION TO INCLUDE FILTERS
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
            let matching_tertiary_items: TertiarySubcategory[] = []
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

  // group filter checkboxes into rows where applicable
  const renderFilterGroups = (filters: Filter[] | undefined) => {
    if (!filters || filters.length === 0) {
      return null
    }

    // 'Low' and 'High' estimates for 'Agricultural Chemicals'
    if (filters.length === 2 && filters[0].label.includes("Estimate")) {
      return (
        <div className="grid grid-cols-3 gap-x-2 gap-y1.5 text-xs px-2 py-1 pl-6">
          <div className="flex items-center">
            <span className="font-medium">Estimate (kg):</span>
          </div>
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Checkbox
                id={filter.id}
                checked={isFilterSelected(filter.id)}
                onCheckedChange={() => toggleFilter(filter.id)}
                className="h-3.5 w-3.5 mr-1.5"
              />
              <label htmlFor={filter.id} className="text-xs cursor-pointer">
                {filter.label.includes("Low") ? "Low" : "High"}
              </label>
            </div>
          ))}
        </div>
      )
    }

    // O.W. 'Environmental Hazards' handling

    // Special case for 'Drought' (Since it has different Exposure filters)
    if (filters.some(filter => filter.id === "drought-agri" || filter.label.includes("Agriculture"))) {
      const agricultureFilter = filters.find(filter => filter.label.includes("Agriculture"));
      const otherFilters = filters.filter(filter => !filter.label.includes("Agriculture"));
      
      return (
        <div className="grid grid-cols-3 gap-x-2 gap-y-1.5 text-xs px-2 py-1 pl-6">
          <div className="flex items-center">
            <span className="font-medium">Exposure:</span>
          </div>
          
          {/* if Exposure (Argiculture checkbox ONLY) */}
          {agricultureFilter && (
            <div className="flex items-center">
              <Checkbox
                id={agricultureFilter.id}
                checked={isFilterSelected(agricultureFilter.id)}
                onCheckedChange={() => toggleFilter(agricultureFilter.id)}
                className="h-3.5 w-3.5 mr-1.5"
              />
              <label htmlFor={agricultureFilter.id} className="text-xs cursor-pointer">
                Agriculture
              </label>
            </div>
          )}
          
          {/* empty third cell */}
          <div></div>
          
          {/* O.W. remaining (Annualized Frequency, Expected Annual Loss and Risk Index Rating) */}
          {otherFilters.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Checkbox
                id={filter.id}
                checked={isFilterSelected(filter.id)}
                onCheckedChange={() => toggleFilter(filter.id)}
                className="h-3.5 w-3.5 mr-1.5"
              />
              <label htmlFor={filter.id} className="text-xs cursor-pointer">
                {filter.label.includes("Annualized") ? "Freq." : 
                filter.label.includes("Expected") ? "Loss" :
                filter.label.includes("Risk") ? "Risk" : 
                filter.label}
              </label>
            </div>
          ))}
        </div>
      )
    }

    // Remaining 'Environmental Hazards'
    if (filters.some(filter => filter.label.includes("Exposure") || filter.label.includes("Annualized"))) {
      const exposureFilters = filters.filter(filter => filter.label.includes("Exposure"));
      const otherFilters = filters.filter(filter => !filter.label.includes("Exposure"));
      
      return (
        <div className="grid grid-cols-3 gap-x-2 gap-y-1.5 text-xs px-2 py-1 pl-6">
          <div className="flex items-center">
            <span className="font-medium">Exposure:</span>
          </div>
          
          {/* if Exposure (Building and Population checkboxes) */}
          {exposureFilters.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Checkbox
                id={filter.id}
                checked={isFilterSelected(filter.id)}
                onCheckedChange={() => toggleFilter(filter.id)}
                className="h-3.5 w-3.5 mr-1.5"
              />
              <label htmlFor={filter.id} className="text-xs cursor-pointer">
                {filter.label.includes("Building") ? "Building" : "Pop."}
              </label>
            </div>
          ))}
          
          {/* O.W. remaining (Annualized Frequency, Expected Annual Loss and Risk Index Rating) */}
          {otherFilters.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Checkbox
                id={filter.id}
                checked={isFilterSelected(filter.id)}
                onCheckedChange={() => toggleFilter(filter.id)}
                className="h-3.5 w-3.5 mr-1.5"
              />
              <label htmlFor={filter.id} className="text-xs cursor-pointer">
                {filter.label.includes("Annualized") ? "Freq." : 
                 filter.label.includes("Expected") ? "Loss" :
                 filter.label.includes("Risk") ? "Risk" : 
                 filter.label}
              </label>
            </div>
          ))}
        </div>
      )
    }

    // 'Air Quality' handling
    if (filters.some(filter => filter.label.includes("ppb"))) {
      return(
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs px-2 py-1 pl-6">
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Checkbox
                id={filter.id}
                checked={isFilterSelected(filter.id)}
                onCheckedChange={() => toggleFilter(filter.id)}
                className="h-3.5 w-3.5 mr-1.5 flex-shrink-0"
              />
              <label htmlFor={filter.id} className="text-xs cursor-pointer">
                {filter.label}
              </label>
            </div>
          ))}
        </div>
      );
    }
  }

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
            // collapsible="none"
            className="!h-auto !static top-auto !border-none"
            {...props}
          >
            <SidebarContent className="!overflow-visible">
              <SidebarMenu className="pt-2">
                {filteredCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-2">

                    {/* Primary Categories */}
                    <SidebarMenuItem className={`flex items-center px-2 py-1.5 hover:bg-muted/50 rounded-md ${getCategoryColorClass(category.color)}`}>
                      <button
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

                    {/* Secondary Subcategories */}
                    {expandedCategories.includes(categoryIndex) && (
                      <div className="mt-1">
                        {category.subcategories.map((subcategory, subcategoryIndex) => (
                          <div key={subcategoryIndex} className="mb-1">

                            {/* Secondary Subcategory */}
                            <div 
                              className={`flex items-center px-2 py-1.5 hover:bg-muted/50 rounded-md ${getCategoryColorClass(category.color)} mb-1`}
                            >
                              {"subcategories" in subcategory || "filters" in subcategory ? (
                                <button
                                  onClick={() => toggleSubcategory(categoryIndex, subcategoryIndex)}
                                  className="flex items-center w-full"
                                >
                                  {expandedSubcategories[`${categoryIndex}-${subcategoryIndex}`] ? (
                                    <ChevronDown className="h-3.5 w-3.5 mr-1" />
                                  ) : (
                                    <ChevronRight className="h-3.5 w-3.5 mr-1" />
                                  )}
                                  {'icon' in subcategory && subcategory.icon && (
                                    <subcategory.icon className="h-4 w-4 mr-2" />
                                  )}
                                  <span className="text-sm">{subcategory.title}</span>
                                </button>
                              ) : (
                                <span className="text-sm ml-5">{subcategory.title}</span>
                              )}
                            </div>
                            
                            {/* Air Quality Filters (displayed directly under secondary subcategory) */}
                            {"filters" in subcategory && expandedSubcategories[`${categoryIndex}-${subcategoryIndex}`] && (
                              <div className="mt-1">
                                {renderFilterGroups(subcategory.filters)}
                              </div>
                            )}
                            
                            {/* Tertiary Subcategories */}
                            {"subcategories" in subcategory && expandedSubcategories[`${categoryIndex}-${subcategoryIndex}`] && (
                              <div className="mt-1">
                                {subcategory.subcategories?.map((tertiarySubcategory, tertiaryIndex) => (
                                  <div key={tertiaryIndex} className="mb-1">
                                    
                                    {/* Tertiary Subcategory */}
                                    <div 
                                      className={`flex items-center px-2 py-1 text-sm hover:bg-muted/50 rounded-md mb-0.5 ${getCategoryColorClass(category.color)}`}
                                    >
                                      {"subcategories" in tertiarySubcategory ? (
                                        <button
                                          onClick={() => toggleTertiarySubcategory(categoryIndex, subcategoryIndex, tertiaryIndex)}
                                          className="flex items-center w-full"
                                        >
                                          {expandedTertiarySubcategories[`${categoryIndex}-${subcategoryIndex}-${tertiaryIndex}`] ? (
                                            <ChevronDown className="h-3 w-3 mr-1" />
                                          ) : (
                                            <ChevronRight className="h-3 w-3 mr-1" />
                                          )}
                                          <span className="text-sm ml-4">{tertiarySubcategory.title}</span>
                                        </button>
                                      ) : (
                                        <span className="text-sm ml-5">{tertiarySubcategory.title}</span>
                                      )}
                                    </div>
                                    
                                    {/* Quaternary Subcategories */}
                                    {"subcategories" in tertiarySubcategory && 
                                     expandedTertiarySubcategories[`${categoryIndex}-${subcategoryIndex}-${tertiaryIndex}`] && (
                                      <div className="mt-0.5">
                                        {tertiarySubcategory.subcategories?.map((quaternarySubcategory, quaternaryIndex) => (
                                          <div key={quaternaryIndex} className="mb-0.5">

                                            {/* Quaternary Subcategory */}
                                            <div 
                                              className="flex items-center px-2 py-1 text-sm hover:bg-muted/50 rounded-md mb-0.5"
                                            >
                                              <span className="text-sm ml-9">{quaternarySubcategory.title}</span>
                                            </div>
                                            
                                            {/* Render filter checkboxes */}
                                            {renderFilterGroups(quaternarySubcategory.filters)}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
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
