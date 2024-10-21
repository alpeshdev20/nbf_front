"use client";

//* Importing components
import React, { useEffect, useState, ChangeEvent } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import Select, {
  StylesConfig,
  ControlProps,
  CSSObjectWithLabel,
} from "react-select";
import { getAgeGroups, getResourceCategories } from "@/services/general";
import { getSearchData } from "@/services/resources";
import ResourceCardLoader from "@/components/Resources/ResourceCardLoader/ResourceCardLoader";
import ResourceCard from "@/components/Resources/ResourceCard/ResourceCard";
import { useSession } from "@/providers/SessionProvider";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

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

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";
import { FaBook } from "react-icons/fa6";

const Search = () => {
  const customStyles: CustomStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "auto",
      maxWidth: "auto",
      height: "3vw",
    }),

    menu: (provided) => ({ ...provided, zIndex: 2 }),
  };

  const { session } = useSession();

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<Option | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [query, setQuery] = useState<string>("");

  //* getting Age Groups
  const { ageGroupData, isSuccess } = getAgeGroups();

  //* Getting Material Categories
  const { categoriesData, categorySuccess } = getResourceCategories();

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

  const categoriesOptions: Option[] = categoriesData
    ? categoriesData.map((row) => ({
        value: row.id,
        label: row.material_type,
      }))
    : [
        {
          value: 0,
          label: "All Categories",
        },
      ];

  // Prepend the "All Categories" option
  categoriesOptions.unshift({
    value: 0,
    label: "All Categories",
  });

  useEffect(() => {
    if (ageGroupOptions.length > 0) {
      setSelectedAgeGroup(ageGroupOptions[0]);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (categoriesOptions.length > 0) {
      setSelectedCategory(categoriesOptions[0]);
    }
  }, [categorySuccess]);

  //* handling Age Group
  const handleAgeGroupChange = (selectedOption: Option | null) => {
    setSelectedAgeGroup(selectedOption);
  };

  //*Handle Category Value
  const handleCategoryChange = (selectedOption: Option | null) => {
    setSelectedCategory(selectedOption);
  };

  //* handle Search Value
  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //* Search Query Data
  const { searchSuccess, searchData, isLoading } = getSearchData(
    query,
    selectedCategory?.value ?? 0,
    selectedAgeGroup?.value ?? 0
  );

  useEffect(() => {
    return () => {
      setSelectedAgeGroup(null);
      setSelectedCategory(null);
      setQuery("");
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />
      <section className="search_section">
        <div className="search_container">
          <div className="app-container">
            <div className="search_filters_container">
              <div className="search_input">
                <div className="form-group">
                  <input
                    type="text"
                    name="search"
                    className="form-input"
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSearchQuery(e)
                    }
                    placeholder="Enter at least three (3) characters to begin the search"
                  />
                </div>
              </div>
              <div className="search_select">
                <Select<Option>
                  options={categoriesOptions}
                  isSearchable={false}
                  styles={customStyles}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="search_select">
                <Select<Option>
                  options={ageGroupOptions}
                  isSearchable={false}
                  styles={customStyles}
                  value={selectedAgeGroup}
                  onChange={handleAgeGroupChange}
                />
              </div>
            </div>
          </div>

          <div className="search_result_section">
            <div className="app-container">
              {query.length >= 3 && !isLoading && searchData.length === 0 && (
                <NoDataFound />
              )}

              {query.length === 0 && searchData.length === 0 && (
                <div className="search-instruction">
                  <FaBook />
                  <p>Search with the title or word.</p>
                  <p>Try Finance, Biometric, Business, Law, etc.</p>
                </div>
              )}
              <div className="search_result_container">
                {isLoading && <ResourceCardLoader counter={36} />}

                {!isLoading &&
                  searchSuccess &&
                  searchData.length !== 0 &&
                  searchData.map((data) =>  {
                    let url = "/";
                    if (data.material_type === "Videos") {
                      url = `/resources/videos/${data.slug}`;
                    } else if (data.material_type === "Class Notes") {
                      url = `/resources/class-notes/${data.slug}`;
                    } else if (data.material_type === "Audio Books") {
                      url = `/resources/audio-books/${data.slug}`;
                    } else if (data.material_type === "Books" || data.material_type === "e-Books") {
                      url = `/resources/books/${data.slug}`;
                    } else {
                      url = "/";
                    }
                    
                    return (
                      <ResourceCard
                        key={data.slug}
                        image={
                          data.resource_image
                            ? data.resource_image
                            : DefaultResourceImage
                        }
                        author={data.author ?? ""}
                        title={data.resource_name}
                        rating={data.rating}
                        totalReviews={data.reviews}
                        isUserLogin={session.isLoggedIn}
                        url={
                          session.isLoggedIn
                            ? `${url}`
                            : "/log-in"
                        }
                        resourceType={data.material_type}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Search;
