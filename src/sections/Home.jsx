import React from "react";
import Button from "@mui/material/Button";
import "./style.css";
import GradientText from "../components/GradientText";
import AnimatedContent from "../components/AnimatedComponents";

// Use the base URL from Vite to handle both development and production paths
const RobotSvg = `${import.meta.env.BASE_URL}Robot_Element.svg`;

const Home = () => {
  return (
    <section className="w-full flex justify-center items-center min-h-screen px-30 pt-12" id="home">
      <div className="w-150 flex flex-col text-justify">
        <div className="flex flex-col items-start gap-5">

          <AnimatedContent direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
                  <h1 className="text-9xl lg:text-7xl font-bold text-[#042046] leading-tight">
              <GradientText colors={["#164260", "#4079ff", "#164260", "#164260", "#164260"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
              >
                SecuriSense
              </GradientText>
            </h1>

                </AnimatedContent>

          <AnimatedContent direction="horizontal"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
                  <div className="flex flex-col items-start gap-5">
            <h3 className="text-blue-950 italic font-light mt-4 max-w-1xl">
            SecuriSense is an AI-driven security platform that detects potential
            threats in real time. Whether it's suspicious code, unsafe links, or
            hidden vulnerabilities, our intelligent detector helps you stay one
            step ahead of cyber risks.
          </h3>

          <div className="mt-9 flex gap-5">
            <a href="#detector">
              <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to bottom right, #f97316, #ef4444)",
                color: "white",
                px: 3,  
                py: 1.5,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(25,118,210,0.3)",
                },
              }}>
                Try Detector
              </Button>
            </a>

            <a href="#about">
              <Button
                variant="outlined"
                sx={{
                  color: "#f97316",
                  borderColor: "#f97316",
                  px: 3,
                  py: 1.5,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(25,118,210,0.3)",
                    backgroundColor: "#f97316",
                    color: "white",
                  },
                }}
              >
                Learn More
              </Button>
          </a>
            </div>
          </div>
                </AnimatedContent>
        </div>
      </div>

      {/* Right Side: Image */}
      <AnimatedContent direction="horizontal"
                reverse={false}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.10}>
                   <div className="flex justify-center">
        <img src={RobotSvg} alt="AI Robot" className="w-full max-w-[700px] h-auto pt-10 floating" />
      </div>

                </AnimatedContent>
    </section>
  );
};

export default Home;
