//* Components
import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import Navbar from '@/components/layout/Navbar/Navbar';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import Footer from '@/components/layout/Footer/Footer';

//* images
import InstructorsImage from "@/images/instructors/instructor.png";

const NbfForInstructors = () => {
    return (
        <>

            {/* Navbar  */}
            <Navbar
                navType="main"
                btnClass="primary"
                btnURL="/explore-k12"
                btnContent="EXPLORE K12/SCHOOL"
            />
            <div className="instructors_section">
                <div className="instructors_container">
                    <div className="app-container">
                        <div className="instructors_content">
                            <p>Netbookflix for <span>Instructors</span></p>
                            <h5>We assist in your journey to help student progression and transformation</h5>
                            <h4>Unlimited access to 5 million+ pages of academic content</h4>

                            <Button link='/partner-with-us' content='PARTNER WITH US' btnColor='primary' />
                        </div>
                    </div>


                    <div className="instrcutor_features_container">
                        <div className="app-container">
                            <div className="instrcutor_features_card_container">
                                <div className="instrcutor_features_card">
                                    <h6>NBF learning resources link within Curriculum</h6>
                                    <p>Integrate Topic-wise Reference link throughout the subject curriculum</p>
                                    <p>Provide a Pre & Post Classroom Reading assignments to your students</p>
                                </div>

                                <div className="instrcutor_features_card">
                                    <h6>Building proficiency in “LIFE-SKILLS”</h6>
                                    <p>Develop your personal AI prompt learning strategy for each subject and class</p>
                                    <p>Learn systematically mission critical Life Skills with NAISA</p>
                                </div>

                                <div className="instrcutor_features_card">
                                    <h6>Design Student Learning Journey</h6>
                                    <p>InDesign a Personalized learning journey for the entire class using AI tools & analytics</p>
                                </div>
                            </div>

                            <div className="instructors_image">
                                <Image src={InstructorsImage} alt='Netbookflix for Instructors' />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* News Letter  */}
            < NewsLetter />

            {/* Footer  */}
            < Footer />
        </>
    )
}

export default NbfForInstructors