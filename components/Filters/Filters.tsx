"use client";

//* importing components
import React, { useEffect, useState } from "react";
import Select, {
  StylesConfig,
  ControlProps,
  CSSObjectWithLabel,
} from "react-select";
import { getAgeGroups, getDepartments, getGenres, getSubjects } from "@/services/general";

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
  setSelectedDepartment: (option: Option | null) => void;
  setSelectedSubject: (option: Option | null) => void;
  selectedGenres: Option | null;
  selectedAgeGroup: Option | null;
  selectedDepartment: Option | null;
  selectedSubject: Option | null;
}

const Filters: React.FC<FiltersInterface> = ({
  selectedAgeGroup,
  selectedGenres,
  selectedDepartment,
  selectedSubject,
  setSelectedAgeGroup,
  setselectedGenres,
  setSelectedDepartment,
  setSelectedSubject
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
  const [genreId, setGenreId] = useState<number>(-1);
  const { data: departmentsData = [] } = getDepartments(genreId);
  const [subjetId, setsubjetId] = useState<number>(-1);
  const { data: subjectsData = [] } = getSubjects(subjetId);
  const [filteredDepartments, setFilteredDepartments] = React.useState<Option[]>([]);
  const [FilteredSubjects, setFilteredSubjects] = React.useState<Option[]>([]);



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

    // const departmentOptions = [
    //   { value: 0, label: "Select Departments" },
    //   ...(departmentsData?.map((row: any) => ({
    //     value: row.id,
    //     label: row.department_name,
    //   })) ?? [])
    // ];
  
    // const subjectOptions = [{ value: 0, label: "All Subjects" }, ...(subjectsData?.map(row => ({
    //   value: row.id,
    //   label: row.subject_name,
    // })) ?? [])];


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

  const handleGenresChange = (selectedOption: Option | null) => {
    setselectedGenres(selectedOption);
    setSelectedDepartment(null);
    setSelectedSubject(null);
    setFilteredDepartments([]); 
    setGenreId(selectedOption?.value ?? -1);
  };

  useEffect(() => {
    if (selectedDepartment) {
      setsubjetId(selectedDepartment.value);
      setSelectedSubject(null); 
    }
  }, [selectedDepartment]);
  
useEffect(() => {
  if (isSuccess) {
    const mapped = departmentsData.map((row: any) => ({
      value: row.id,
      label: row.department_name,
    }));
    setFilteredDepartments([
      { value: 0, label: "Select Department" },
      ...mapped,
    ]);
  } else if (genreId === 0 || genreId === -1) {
    setFilteredDepartments([{ value: -1, label: "Select Department" }]);
  }
}, [departmentsData, isSuccess, genreId]);



useEffect(() => {
  if (isSuccess) {
    const mapped = subjectsData.map((row: any) => ({
      value: row.id,
      label: row.subject_name,
    }));
    setFilteredSubjects([
      { value: 0, label: "Select Subject" },
      ...mapped,
    ]);
  } else if (subjetId === 0 || subjetId === -1) {
    setFilteredSubjects([{ value: -1, label: "Select Subject" }]);
  }
}, [subjectsData, isSuccess, subjetId]);



  // //*Handle Subject Value
  // useEffect(() => {
  //   if (subjectOptions.length > 0) {
  //     setSelectedSubject(subjectOptions[0]);
  //   }
  // }, [subjectsData]);

  return (
    <div className={Style.resouses_filters_section}>
      <div className="app-container">
        <div className={Style.resouses_filters_container}>
          <div className={Style.resouses_filters}>
            <div className={Style.full_width_filter}>
              <Select
                options={genresOptions}
                isSearchable={true}
                placeholder="Select Genres"
                styles={customStyles}
                value={selectedGenres}
                onChange={handleGenresChange}
              />
            </div>

            <div className={Style.full_width_filter}>
              <Select
                options={filteredDepartments}
                isSearchable
                placeholder="Select Department"
                styles={customStyles}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
              />
            </div>
            <div className={Style.full_width_filter}>
              <Select
                options={FilteredSubjects}
                isSearchable
                placeholder="Select Subject"
                styles={customStyles}
                value={selectedSubject}
                onChange={setSelectedSubject}
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
