"use client";

//* importing components
import React, { useEffect, useState } from "react";
import Select, {
  StylesConfig,
  ControlProps,
  CSSObjectWithLabel,
} from "react-select";
import {
  getAgeGroups,
  getClasses,
  K12getGenres,
  getSubjects,
  getDepartments,
} from "@/services/general";

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
  setSelectedSubject: (option: Option | null) => void;
  setSelectedDepartment: (option: Option | null) => void;
  selectedGenres: Option | null;
  selectedAgeGroup: Option | null;
  selectedSubject: Option | null;
  selectedDepartment: Option | null;
}

const K12Filters: React.FC<FiltersInterface> = ({
  selectedAgeGroup,
  selectedGenres,
  selectedDepartment,
  selectedSubject,
  setSelectedAgeGroup,
  setselectedGenres,
  setSelectedSubject,
  setSelectedDepartment,
}) => {
  const customStyles: CustomStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "auto",
      maxWidth: "auto",
    }),
    menu: (provided) => ({ ...provided, zIndex: 2 }),
  };

  //* Age Group and Genre
  const { ageGroupData, isSuccess } = getAgeGroups();
  const { genreSuccess, genresData } = K12getGenres();
  const { classesData } = getClasses();
  const [genreId, setGenreId] = useState<number>(-1);
  const { data: departmentsData = [] } = getDepartments(genreId);
  const [subjetId, setsubjetId] = useState<number>(-1);
  const { data: subjectsData = [] } = getSubjects(subjetId);
  const [filteredDepartments, setFilteredDepartments] = React.useState<
    Option[]
  >([]);
  const [FilteredSubjects, setFilteredSubjects] = React.useState<Option[]>([]);

  const ageGroupOptions: Option[] = ageGroupData
  ? ageGroupData
      .filter((row) => row.group !== "Higher Education (18 to 22 Years)")
      .map((row) => ({
        value: row.id,
        label: row.group,
      }))
  : [];
  // ageGroupOptions.unshift({
  //   value: -1,
  //   label: "All Age Group",
  // });

  const genresOptions: Option[] = genresData
    ? genresData.map((row) => ({
        value: row.id,
        label: row.genre_name,
      }))
    : [];

  genresOptions.unshift({
    value: 0,
    label: "School Boards",
  });

  // const classOptions: Option[] = classesData
  //   ? classesData.map((row: any) => ({
  //       value: row.id,
  //       label: row.class_name,
  //     }))
  //   : [];

  // classOptions.unshift({
  //   value: -1,
  //   label: "Select Class",
  // });

  // const subjectOptions: Option[] = subjectsData
  //   ? subjectsData.map((row: any) => ({
  //       value: row.id,
  //       label: row.subject_name,
  //     }))
  //   : [];

  // subjectOptions.unshift({
  //   value: -1,
  //   label: "Select Subject",
  // });

  //* State for selected class
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

  // useEffect(() => {
  //   if (classOptions.length > 0) {
  //     setSelectedClass(classOptions[0]);
  //   }
  // }, [classesData]);

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
        { value: 0, label: "Class / Department" },
        ...mapped,
      ]);
    } else if (genreId === 0 || genreId === -1) {
      setFilteredDepartments([{ value: -1, label: "Class / Department" }]);
    }
  }, [departmentsData, isSuccess, genreId]);

  useEffect(() => {
    if (isSuccess) {
      const mapped = subjectsData.map((row: any) => ({
        value: row.id,
        label: row.subject_name,
      }));
      setFilteredSubjects([{ value: 0, label: "Select Subject" }, ...mapped]);
    } else if (subjetId === 0 || subjetId === -1) {
      setFilteredSubjects([{ value: -1, label: "Select Subject" }]);
    }
  }, [subjectsData, isSuccess, subjetId]);

  //* Handlers
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

  // const handleClassChange = (selectedOption: Option | null) => {
  //   setSelectedClass(selectedOption);
  // };

  const handleSubjectChange = (selectedOption: Option | null) => {
    setSelectedSubject(selectedOption);
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
                placeholder="School Boards"
                styles={customStyles}
                value={selectedGenres}
                onChange={handleGenresChange}
              />
            </div>

            <div className={Style.full_width_filter}>
              <Select
                options={filteredDepartments}
                isSearchable
                placeholder="Class / Department"
                styles={customStyles}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
              />
            </div>

            <div className={Style.full_width_filter}>
              <Select
                options={FilteredSubjects}
                isSearchable={true}
                placeholder="Select Subject"
                styles={customStyles}
                value={selectedSubject}
                onChange={handleSubjectChange}
              />
            </div>
            <div className={Style.full_width_filter}>
              <Select
                options={ageGroupOptions}
                isSearchable={true}
                placeholder="Select Age Group"
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

export default K12Filters;
