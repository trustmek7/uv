import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { FilterState } from '../types';
interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  className?: string;
}
const FILTER_OPTIONS = {
  gender: ['Mujer', 'Hombre', 'Niños', 'Unisex'],
  size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  category: [
  'Polos',
  'Leggings',
  'Casacas',
  'Cortavientos',
  'Gorras',
  'Mangas',
  'Conjuntos'],

  upf: ['UPF 30+', 'UPF 50+', 'UPF 50++'],
  activity: ['Outdoor', 'Trekking', 'Running', 'Deportivo', 'Escolar'],
  conjuntos: [
  'Conjuntos escolares',
  'Conjuntos deportivos',
  'Conjuntos casuales',
  'Conjuntos outdoor',
  'Uniformes deportivos',
  'Ropa deportiva escolar']

};
export function FilterSidebar({
  filters,
  setFilters,
  className = ''
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    gender: true,
    conjuntos: true
  });
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const handleCheckboxChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentList = prev[key] as string[];
      if (currentList.includes(value)) {
        return {
          ...prev,
          [key]: currentList.filter((item) => item !== value)
        };
      } else {
        return {
          ...prev,
          [key]: [...currentList, value]
        };
      }
    });
  };
  const AccordionSection = ({
    title,
    filterKey,
    options




  }: {title: string;filterKey: keyof FilterState;options: string[];}) => {
    const isOpen = openSections[filterKey];
    return (
      <div className="border-b border-slate-100 py-5">
        <button
          className="flex w-full items-center justify-between text-left group"
          onClick={() => toggleSection(filterKey)}>
          
          <span className="text-xs uppercase tracking-widest font-medium text-navy group-hover:opacity-70 transition-opacity">
            {title}
          </span>
          {isOpen ?
          <ChevronUp strokeWidth={1.5} className="w-4 h-4 text-slate-400" /> :

          <ChevronDown strokeWidth={1.5} className="w-4 h-4 text-slate-400" />
          }
        </button>

        {isOpen &&
        <div className="mt-4 flex flex-col gap-3">
            {options.map((option) => {
            const isChecked = (filters[filterKey] as string[]).includes(
              option
            );
            return (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group">
                
                  <div
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isChecked ? 'bg-navy border-navy' : 'border-slate-300 group-hover:border-navy'}`}>
                  
                    {isChecked &&
                  <Check strokeWidth={3} className="w-3 h-3 text-white" />
                  }
                  </div>
                  <span className="text-sm text-slate-600 font-light group-hover:text-navy transition-colors">
                    {option}
                  </span>
                </label>);

          })}
          </div>
        }
      </div>);

  };
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-light text-navy">Filtros</h2>
        <button
          onClick={() =>
          setFilters({
            gender: [],
            size: [],
            color: [],
            category: [],
            upf: [],
            activity: [],
            conjuntos: [],
            priceRange: [0, 500]
          })
          }
          className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-navy transition-colors">
          
          Limpiar
        </button>
      </div>

      <AccordionSection
        title="Conjuntos Deportivos"
        filterKey="conjuntos"
        options={FILTER_OPTIONS.conjuntos} />
      
      <AccordionSection
        title="Categoría"
        filterKey="category"
        options={FILTER_OPTIONS.category} />
      
      <AccordionSection
        title="Género"
        filterKey="gender"
        options={FILTER_OPTIONS.gender} />
      
      <AccordionSection
        title="Talla"
        filterKey="size"
        options={FILTER_OPTIONS.size} />
      
      <AccordionSection
        title="Protección UV"
        filterKey="upf"
        options={FILTER_OPTIONS.upf} />
      
      <AccordionSection
        title="Actividad"
        filterKey="activity"
        options={FILTER_OPTIONS.activity} />
      
    </div>);

}