"use client";

//* importing components
import React, { useEffect } from "react";
import Select, {
  StylesConfig,
  ControlProps,
  CSSObjectWithLabel,
} from "react-select";
import { getAgeGroups, getGenres } from "@/services/general";

//* css
import Style from "@/components/Filters/Filters.module.css";

//* interface
interface CustomStyles extends Partial<StylesConfig<Option, false>> {
  control?: (
    base: CSSObjectWithLabel,
    props: ControlProps<Option, false>
  ) => CSSObjectWithLabel;
}

interface Option {
  value: number;
  label: string;
}

interface FiltersInterface {
  setselectedGenres: (option: Option | null) => void;
  setSelectedAgeGroup: (option: Option | null) => void;
  selectedGenres: Option | null;
  selectedAgeGroup: Option | null;
}

const Filters: React.FC<FiltersInterface> = ({
  selectedAgeGroup,
  selectedGenres,
  setSelectedAgeGroup,
  setselectedGenres,
}) => {
  const customStyles: CustomStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "auto",
      maxWidth: "auto",
    }),

    menu: (provided) => ({ ...provided, zIndex: 2 }),
  };

  //* getting Age Groups
  const { ageGroupData, isSuccess } = getAgeGroups();
  const { genreSuccess, genresData } = getGenres();

  const ageGroupOptions: Option[] = ageGroupData
    ? ageGroupData.map((row) => ({
        value: row.id,
        label: row.group,
      }))
    : [
        {
          value: 0,
          label: "All Age Group",
        },
      ];

  const genresOptions: Option[] = genresData
    ? genresData.map((row) => ({
        value: row.id,
        label: row.genre_name,
      }))
    : [
        {
          value: 0,
          label: "All Genres",
        },
      ];

  // Prepend the "All Genres" option
  genresOptions.unshift({
    value: 0,
    label: "All Genres",
  });

  useEffect(() => {
    if (ageGroupOptions.length > 0) {
      setSelectedAgeGroup(ageGroupOptions[0]);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (genresOptions.length > 0) {
      setselectedGenres(genresOptions[0]);
    }
  }, [genreSuccess]);

  //* handling Age Group
  const handleAgeGroupChange = (selectedOption: Option | null) => {
    setSelectedAgeGroup(selectedOption);
  };

  //*Handle Category Value
  const handleGenresChange = (selectedOption: Option | null) => {
    setselectedGenres(selectedOption);
  };

  return (
    <div className={Style.resouses_filters_section}>
      <div className="app-container">
        <div className={Style.resouses_filters_container}>
          <div className={Style.resouses_filters}>
            <div className={Style.full_width_filter}>
              <Select
                options={genresOptions}
                isSearchable={true}
                placeholder="All Genres"
                styles={customStyles}
                value={selectedGenres}
                onChange={handleGenresChange}
              />
            </div>

            <div className={Style.full_width_filter}>
              <Select
                options={ageGroupOptions}
                isSearchable={true}
                placeholder="All Age Group"
                styles={customStyles}
                value={selectedAgeGroup}
                onChange={handleAgeGroupChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
