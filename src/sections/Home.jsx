import React from "react";
import Button from "@mui/material/Button";
import "./style.css";
import GradientText from "../components/GradientText";
import AnimatedContent from "../components/AnimatedComponents";

const RobotSvg = `${import.meta.env.BASE_URL}Robot_Element.svg`;

const Home = () => {
  return (
    <section
  className="w-full flex justify-center items-center min-h-screen px-30 -mt-10 md:-mt-16"
  id="home"
>
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
              className="gradient-btn from-orange-500 to-red-500"
              sx={{
                position: "relative",
                overflow: "hidden",
                color: "white",
                px: 4,  
                py: 1.5,
                borderRadius: "12px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                fontSize: "1rem",
                transition: "all 0.3s ease-in-out",
                background: "linear-gradient(90deg, #f97316, #ef4444, #f97316)",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% center",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 20px rgba(239, 68, 68, 0.3)",
                  backgroundPosition: "100% center",
                },
                "&:active": {
                  transform: "translateY(0px)",
                }
              }}>
                Try Detector
              </Button>
            </a>

            <a href="#about">
              <Button
                variant="outlined"
                className="outline-btn"
                sx={{
                  color: "#4079ff",
                  borderColor: "#4079ff",
                  borderWidth: "2px",
                  px: 4,
                  py: 1.45,
                  borderRadius: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    borderColor: "#4079ff",
                    background: "rgba(64, 121, 255, 0.05)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 20px rgba(64, 121, 255, 0.15)",
                    color: "#4079ff",
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                  }
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
        <img 
          src={RobotSvg} 
          alt="AI Robot" 
          className="w-full max-w-[900px] h-auto pt-10 floating" 
          style={{ width: "auto", 
              height: "80vh",
              maxHeight: "850px",
              marginRight: "-30%",
              transform: "scale(1.4)"
            }}
        />
      </div>

                </AnimatedContent>
    </section>
  );
};

export default Home;
