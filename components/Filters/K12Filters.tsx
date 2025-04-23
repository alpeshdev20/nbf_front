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
  setSelectedClass: (option: Option | null) => void;
  setSelectedSubject: (option: Option | null) => void;
  selectedGenres: Option | null;
  selectedAgeGroup: Option | null;
  selectedClass: Option | null;
  selectedSubject: Option | null;
}

const K12Filters: React.FC<FiltersInterface> = ({
  selectedAgeGroup,
  selectedGenres,
  selectedClass,
  selectedSubject,
  setSelectedAgeGroup,
  setselectedGenres,
  setSelectedClass,
  setSelectedSubject,
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
  const { subjectsData } = getSubjects();

  const ageGroupOptions: Option[] = ageGroupData
    ? ageGroupData.map((row) => ({
        value: row.id,
        label: row.group,
      }))
    : [];
    ageGroupOptions.unshift({
      value: 0,
      label: "All Age Group",
    });

  const genresOptions: Option[] = genresData
    ? genresData.map((row) => ({
        value: row.id,
        label: row.genre_name,
      }))
    : [];

  genresOptions.unshift({
    value: 0,
    label: "All Genres",
  });

  const classOptions: Option[] = classesData
    ? classesData.map((row: any) => ({
        value: row.id,
        label: row.class_name,
      }))
    : [];

  classOptions.unshift({
    value: 0,
    label: "All Classes",
  });

  const subjectOptions: Option[] = subjectsData
    ? subjectsData.map((row: any) => ({
        value: row.id,
        label: row.subject_name,
      }))
    : [];

  subjectOptions.unshift({
    value: 0,
    label: "All Subjects",
  });

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

  useEffect(() => {
    if (classOptions.length > 0) {
      setSelectedClass(classOptions[0]);
    }
  }, [classesData]);

  useEffect(() => {
    if (subjectOptions.length > 0) {
      setSelectedSubject(subjectOptions[0]);
    }
  }, [subjectsData]);

  //* Handlers
  const handleAgeGroupChange = (selectedOption: Option | null) => {
    setSelectedAgeGroup(selectedOption);
  };

  const handleGenresChange = (selectedOption: Option | null) => {
    setselectedGenres(selectedOption);
  };

  const handleClassChange = (selectedOption: Option | null) => {
    setSelectedClass(selectedOption);
  };

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

            <div className={Style.full_width_filter}>
              <Select
                options={classOptions}
                isSearchable={true}
                placeholder="All Classes"
                styles={customStyles}
                value={selectedClass}
                onChange={handleClassChange}
              />
            </div>

            <div className={Style.full_width_filter}>
              <Select
                options={subjectOptions}
                isSearchable={true}
                placeholder="All Subjects"
                styles={customStyles}
                value={selectedSubject}
                onChange={handleSubjectChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default K12Filters;
