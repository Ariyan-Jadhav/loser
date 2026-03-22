"use client";
import React, { useEffect, useRef, useState } from "react";
import "./components/omj.style.css";
import gsap from "gsap";
import DisableZoom from "./components/ZoomBlock";

function Page() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't run loading animation on mobile

    const tl = gsap.timeline();

    tl.from(textRef.current?.children || [], {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.3,
      ease: "power3.out",
    }).to(
      textRef.current?.children || [],
      {
        scale: 1.2,
        duration: 0.3,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      },
      "+=0.5",
    );

    setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setLoading(false);
        },
      });
    }, 17000);
  }, [isMobile]);

  useEffect(() => {
    if (loading || isMobile) return;

    const parallax_el = document.querySelectorAll(".parallax");

    function update(CPx, CPy) {
      const xValue = CPx - window.innerWidth / 2;
      const yValue = CPy - window.innerHeight / 2;
      const rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
      parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let speedRot = el.dataset.rotation;
        let isInLeft =
          parseFloat(getComputedStyle(el).left) < window.innerWidth / 2
            ? 1
            : -1;
        let zValue =
          (CPx - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `
        translateX(calc(-50% + ${-xValue * speedx}px))
        rotateY(${rotateDegree * speedRot}deg)
        translateY(calc(-50% + ${yValue * speedy}px))
        perspective(2000px) translateZ(${zValue * speedz}px)
      `;
      });
    }

    const handleMouseMove = (e) => {
      update(e.clientX, e.clientY);
    };
    update(0, 0);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [loading, isMobile]);

  // Mobile warning screen
  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#FCD34D",
            fontFamily: "sans-serif",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            This ain’t for mobile
          </h1>
          <p style={{ fontSize: "20px", opacity: 0.8 }}>
            OPEN IT ON BIG SCREEN
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div
          ref={loaderRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              textAlign: "center",
            }}
          >
            <h1 className="loader-title">LOSER</h1>
            <p className="loader-typewriter">by OMJ</p>

            <div className="loader-bar-wrap">
              <div className="loader-bar" />
            </div>
          </div>
        </div>
      )}
      <div className="sm-grid sm-grid-cols-1 bg-red-950">
        <DisableZoom />
        <div className="flex relative flex-col justify-center items-center min-h-screen">
          <div className=" absolute h-[85%] w-[85%] bg-teal-600 rounded-3xl">
            {/* <img src="shishu-1.png" className="shishu1 parallax" /> */}
            <div className="bg-[#C4ECD6] h-full w-full absolute rounded-2xl overflow-hidden">
              <div className="vignette"></div>
              <img
                src="shishu-1.png"
                className="shishu-1 parallax"
                data-speedz="0.21"
                data-rotation="0.9"
                data-distance="600"
                data-speedy="0.18"
                data-speedx="0.17"
              />
              <img
                src="img/background.jpg"
                data-speedz="0"
                data-speedy="0.38"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
                className="parallax bg-img min-w-screen"
              />
              <img
                src="img/fog_7.png"
                data-speedz="0"
                data-rotation="0"
                data-distance="500"
                data-speedy="0.38"
                data-speedx="0.27"
                className="parallax fog-7"
              />

              <img
                src="img/mountain_10.png"
                data-speedz="0"
                data-speedy="0.200"
                data-distance="700"
                data-rotation="0"
                data-speedx="0.195"
                className="parallax mountain-10"
              />

              <img
                src="img/mountain_9.png"
                data-speedz="0.15"
                data-rotation="0"
                data-speedy="0.132"
                data-distance="1000"
                data-speedx="0.125"
                className="parallax mountain-9"
              />
              <img
                src="img/mountain_8.png"
                data-speedz="0"
                data-speedy="0.144"
                data-rotation="0.2"
                data-distance="1200"
                data-speedx="0.1"
                className="parallax mountain-8"
              />
              <img
                src="img/fog_5.png"
                data-speedz="0"
                data-speedy="0.115"
                data-rotation="0"
                data-speedx="0.16"
                data-distance="1400"
                className="parallax fog-5"
              />
              <img
                src="img/mountain_7.png"
                data-speedz="0"
                data-speedy="0.125"
                data-distance="1600"
                data-speedx="0.1"
                data-rotation="0"
                className="parallax mountain-7"
              />
              <div
                className="text parallax"
                data-speedz="0"
                data-rotation="0.11"
                data-speedy="0.12"
                data-speedx="0.07"
              >
                <h2>Switzerland</h2>
              </div>
              <img
                src="img/mountain_6.png"
                data-speedz="0.05"
                data-rotation="0.12"
                data-speedy="0.1"
                data-distance="2000"
                data-speedx="0.065"
                className="parallax mountain-6"
              />
              <img
                src="img/fog_4.png"
                data-speedz="0"
                data-speedy="0.155"
                data-speedx="0.135"
                data-distance="2100"
                data-rotation="0.14"
                className="parallax fog-4"
              />
              <img
                src="img/mountain_5.png"
                data-speedz="0.13"
                data-speedy="0.1"
                data-speedx="0.08"
                data-distance="2200"
                data-rotation="0.05"
                className="parallax mountain-5"
              />
              <img
                src="img/fog_3.png"
                data-speedz="0"
                data-rotation="0"
                data-speedy="0.15"
                data-distance="2400"
                data-speedx="0.11"
                className="parallax fog-3"
              />
              <img
                src="img/mountain_4.png"
                data-speedz="0.35"
                data-rotation="0.14"
                data-distance="2600"
                data-speedy="0.1"
                data-speedx="0.059"
                className="parallax mountain-4"
              />
              <img
                src="img/mountain_3.png"
                data-speedz="0.32"
                data-speedy="0.102"
                data-speedx="0.04"
                data-distance="2700"
                data-rotation="0.5"
                className="parallax mountain-3"
              />
              <img
                src="img/fog_2.png"
                data-speedz="0"
                data-speedy="0.11"
                data-speedx="0.15"
                data-distance="3000"
                data-rotation="0"
                className="parallax fog-2"
              />
              <img
                src="img/mountain_2.png"
                data-speedz="0"
                data-speedy="0.1"
                data-speedx="0.0235"
                data-rotation="0.15"
                data-distance="3100"
                className="parallax mountain-2"
              />
              <img
                src="img/mountain_1.png"
                data-speedz="0.53"
                data-speedy="0.088"
                data-rotation="0.2"
                data-speedx="0.027"
                data-distance="3200"
                className="parallax mountain-1"
              />
              <img src="img/sun_rays.png" className="sun-rays" />
              <img
                src="img/fog_1.png"
                data-speedz="0"
                data-speedy="0.19"
                data-distance="3500"
                data-speedx="0.3"
                className="parallax fog-1"
              />
            </div>
          </div>
        </div>
        <div className=" text-center flex flex-col justify-center items-center text-[20px] p-28 text-amber-300">
          <h1 className="text-5xl font-bold mb-4 ">Chapter 1: The Plan</h1>
          <p>
            When she first told people she wanted to go abroad, it wasn’t to
            impress anyone; it was something she had genuinely considered. She
            had spent nights researching universities, calculating expenses, and
            saving links she thought she would revisit, most of them leading to
            places she had never seen except through screens quiet cities, clean
            streets, and somewhere in between all of it, Switzerland. For a
            while, it felt real, like something that would definitely happen if
            she just stayed consistent. But consistency is quiet when it leaves.
            She didn’t suddenly give up; she just stopped doing the small things
            that kept the plan alive. The deadlines passed without urgency, the
            research tabs stayed unopened, and the folder she once updated daily
            became something she avoided. Still, she kept talking about it
            whenever someone asked. “I’m working on it,” she would say, not
            because it was true, but because it was easier than admitting she
            had already stopped. Over time, the plan didn’t disappear; it turned
            into an idea of who she could have been, something she carried
            around just to prove that she once had direction.
          </p>
        </div>
        <div className="flex relative flex-col justify-center items-center min-h-screen bg-red-950">
          <div className=" absolute h-[85%] w-[85%] bg-amber-300 rounded-3xl">
            <div className="bg-amber-300 h-full w-full absolute rounded-2xl overflow-hidden">
              <img
                src="shishu-2.png"
                data-speedz="0.21"
                data-rotation="0.9"
                data-distance="600"
                data-speedy="0.18"
                data-speedx="0.17"
                className="shishu-2 parallax"
              />
              <img
                src="aalu/1.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-1"
              />
              <img
                src="aalu/2.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-2"
              />
              <img
                src="aalu/3.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-3"
              />
              <img
                src="aalu/4.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-4"
              />
              <img
                src="aalu/5.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-5"
              />
              <img
                src="aalu/6.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-6"
              />
              <img
                src="aalu/7.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-7"
              />
              <img
                src="aalu/8.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-8"
              />
              <img
                src="aalu/9.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-9"
              />
              <img
                src="aalu/10.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-10"
              />
              <img
                src="aalu/11.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-11"
              />
              <img
                src="aalu/12.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-12"
              />
              <img
                src="aalu/13.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-13"
              />
              <img
                src="aalu/14.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-14"
              />
              <img
                src="aalu/15.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-15"
              />
              <img
                src="aalu/16.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-16"
              />
              <img
                src="aalu/17.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-17"
              />
              <img
                src="aalu/18.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-18"
              />
              <img
                src="aalu/19.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-19"
              />
              <img
                src="aalu/20.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-20"
              />
              <img
                src="aalu/21.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-21"
              />
              <img
                src="aalu/22.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-22"
              />
              <img
                src="aalu/23.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-23"
              />
              <img
                src="aalu/24.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-24"
              />
              <img
                src="aalu/25.png"
                data-speedz="0.01"
                data-speedy="0.01"
                data-rotation="0.01"
                data-distance="2600"
                data-speedx="0.07"
                className="parallax food-25"
              />
            </div>
          </div>
        </div>
        <div className="text-center flex flex-col justify-center items-center text-[20px] p-28 text-amber-300">
          <h1 className="text-5xl font-bold mb-4 ">Chapter 2: The Food</h1>
          <p>
            It started with food because it was the only thing she could
            control. Cooking didn’t ask her to plan her future or explain her
            choices; it just needed time and attention, and in return it gave
            her something complete. One evening, she took a picture of what she
            made and posted it without thinking much about it. People liked it.
            Not just the food, but the way it looked, the way she presented it.
            So she did it again the next day, and then again after that. Slowly,
            it became a habit. She began plating dishes more carefully,
            adjusting colors, thinking about angles before taking a picture. It
            wasn’t about taste anymore, at least not completely. It was about
            how it appeared, how it would be seen by people who weren’t there.
            Her account grew because she stayed consistent, because she kept
            showing up even on days she didn’t feel like it. Over time, cooking
            stopped being something she did for herself and became something she
            did to maintain what she had built. The same hands that once cooked
            without thinking now paused between steps—not to enjoy the process,
            but to make sure it would look right later.
          </p>
        </div>
        <div className="flex relative flex-col justify-center items-center min-h-screen bg-red-950">
          <div className=" absolute h-[85%] w-[85%] bg-[#EF9EAD] rounded-3xl">
            <div className="bg-[#EF9EAD] h-full w-full absolute rounded-2xl overflow-hidden">
              <img
                src="cherry/bgc.jpg"
                className="cherry-bgc parallax min-w-screen"
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="cherry/1.png"
                className="cherry-1 parallax"
                data-speedz="0.1"
                data-speedy="0.134"
                data-rotation="0.3"
                data-distance="200"
                data-speedx="0.091"
              />
              <img
                src="cherry/3.png"
                className="cherry-3 parallax"
                data-speedz="0.42"
                data-speedy="0.12"
                data-rotation="3"
                data-distance="600"
                data-speedx="0.12"
              />
              <img
                src="cherry/4.png"
                className="cherry-4 parallax"
                data-speedz="0.46"
                data-speedy="0.14"
                data-rotation="3"
                data-distance="600"
                data-speedx="0.14"
              />
              <img
                src="cherry/5.png"
                className="cherry-5 parallax"
                data-speedz="0.46"
                data-speedy="0.17"
                data-rotation="3"
                data-distance="600"
                data-speedx="0.15"
              />

              <img
                src="cherry/6.png"
                className="cherry-6 parallax"
                data-speedz="0.4"
                data-speedy="0.2"
                data-rotation="1.5"
                data-distance="600"
                data-speedx="0.03"
              />
              <img
                src="cherry/7.png"
                className="cherry-7 parallax"
                data-speedz="0.4"
                data-speedy="0.2"
                data-rotation="1.5"
                data-distance="600"
                data-speedx="0.03"
              />
              <img
                src="shishu-3.png"
                className="shishu-3 parallax"
                // data-speedz="0.21"
                // data-rotation="0.9"
                // data-distance="600"
                // data-speedy="0.18"
                // data-speedx="0.17"
              />
            </div>
          </div>
        </div>
        <div className="  text-center text-lg flex flex-col justify-center items-center p-28 text-amber-300">
          <h1 className="text-5xl font-bold mb-4 ">Chapter 3: He</h1>
          <p>
            He entered her life without changing anything about it, which is
            probably why she let him stay. There were no dramatic beginnings, no
            overwhelming emotions, just a steady presence that fit neatly into
            her routine. They spent time together in simple ways—talking,
            walking, sitting without needing to fill every silence. It felt
            easy, and she trusted that ease more than anything intense. For a
            while, it became the only part of her life that didn’t feel
            calculated. But even that didn’t last. When he told her he was
            leaving for another city, he explained it like a decision that had
            already been made, and she accepted it just as calmly. There was no
            argument, no attempt to hold on, because neither of them had built
            something that demanded it. After he left, her life didn’t collapse
            or change dramatically; everything continued exactly as it was. The
            only difference was a subtle absence, something she noticed only in
            quiet moments, when there was nothing else to focus on.
          </p>
        </div>
        <div className="flex relative flex-col justify-center items-center min-h-screen bg-red-950">
          <div className=" absolute h-[85%] w-[85%] bg-[#474855] rounded-3xl">
            <div className="bg-[#474855] h-full w-full absolute rounded-2xl overflow-hidden">
              <img
                src="mic/bgc.jpg"
                className="mic-bgc parallax min-w-screen"
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="mic/1.png"
                className="mic-1 parallax"
                data-speedz="0.4"
                data-speedy="0.02"
                data-rotation="1.5"
                data-distance="600"
                data-speedx="0.03"
              />
              <img
                src="mic/2.png"
                className="mic-2 parallax"
                data-speedz="0.4"
                data-speedy="0.02"
                data-rotation="0.5"
                data-distance="600"
                data-speedx="0.03"
              />
              <img
                src="mic/3.png"
                className="mic-3 parallax"
                data-speedz="0.54"
                data-speedy="0.052"
                data-rotation="0.5"
                data-distance="600"
                data-speedx="0.07"
              />
              <img
                src="mic/4.png"
                className="mic-4 parallax"
                data-speedz="0.54"
                data-speedy="0.052"
                data-rotation="0.5"
                data-distance="600"
                data-speedx="0.07"
              />
              <img
                src="mic/5.png"
                className="mic-5 parallax"
                data-speedz="0.21"
                data-rotation="0.9"
                data-distance="600"
                data-speedy="0.08"
                data-speedx="0.07"
              />
              <img
                src="mic/6.png"
                className="mic-6 parallax"
                data-speedz="0.4"
                data-speedy="0.02"
                data-rotation="0.5"
                data-distance="600"
                data-speedx="0.013"
              />
              <img
                src="mic/7.png"
                className="mic-7 parallax"
                data-speedz="0.4"
                data-speedy="0.02"
                data-rotation="0.5"
                data-distance="600"
                data-speedx="0.013"
              />
              <img
                src="shishu-4.png"
                className="shishu-4 parallax"
                data-speedz="0.21"
                data-rotation="0.9"
                data-distance="600"
                data-speedy="0.08"
                data-speedx="0.07"
              />
            </div>
          </div>
        </div>
        <div className="  text-center text-lg flex flex-col justify-center items-center p-28 text-amber-300">
          <h1 className="text-5xl font-bold mb-4 ">Chapter 4: The Kitchen</h1>
          <p>
            The first time she cooked for an actual event, it felt different
            from everything she had done before. There was no time to adjust
            angles, no space to pause and fix small details, no option to redo
            anything once it was done. The quantities were larger, the pace
            faster, and the expectations quieter but heavier. People weren’t
            there to see her food; they were there to eat it and move on. She
            worked through it carefully, focusing on getting things right, but
            it didn’t feel the same. By the time the dishes were served, there
            was no moment to step back and look at what she had made. Plates
            were taken, food was finished, and conversations continued without
            her. No one noticed the effort in the way people online did, and
            there was nothing to capture, nothing to post, nothing to hold onto
            afterward. For the first time, cooking felt less like control and
            more like pressure, and she realized that the version of it she had
            built for herself only worked when she was the one deciding how it
            would be seen.
          </p>
        </div>
        <div className="flex relative flex-col justify-center items-center min-h-screen bg-red-950">
          <div className=" absolute h-[85%] w-[85%] bg-[#DAC3A1] rounded-3xl">
            <div className="bg-[#DAC3A1] h-full w-full absolute rounded-2xl overflow-hidden">
              <img
                src="kid/kid-bgc.jpg"
                className="kid-bgc parallax min-w-screen"
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/1.png"
                className="kid-1 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/2.png"
                className="kid-2 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/3.png"
                className="kid-3 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/4.png"
                className="kid-4 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/5.png"
                className="kid-5 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/6.png"
                className="kid-6 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/7.png"
                className="kid-7 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/10.png"
                className="kid-10 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/11.png"
                className="kid-11 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />

              <img
                src="kid/13.png"
                className="kid-13 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="kid/14.png"
                className="kid-14 parallax "
                data-speedz="0"
                data-speedy="0.1"
                data-rotation="0"
                data-distance="-100"
                data-speedx="0.1"
              />
              <img
                src="shishu-5.png"
                className="shishu-5 parallax"
                data-speedz="0.21"
                data-rotation="0.9"
                data-distance="600"
                data-speedy="0.08"
                data-speedx="0.07"
              />
              <img
                src="shishu-51.png"
                className="shishu-51 parallax"
                data-speedz="0.21"
                data-rotation="0.9"
                data-distance="600"
                data-speedy="0.08"
                data-speedx="0.07"
              />
            </div>
          </div>
        </div>
        <div className="  text-center text-lg flex flex-col justify-center items-center p-28 text-amber-300">
          <h1 className="text-5xl font-bold mb-4 ">Chapter 5: The Job</h1>

          <p>
            Her content didn’t fail suddenly; it just stopped growing. The views
            dropped, the engagement slowed, and the effort it demanded no longer
            made sense. At first, she tried to fix it—posting more, changing
            styles—but nothing really worked. Eventually, she stopped trying.
            The job came in quietly, something stable, something that didn’t
            depend on algorithms or attention. It wasn’t what she wanted, but it
            was enough to keep things moving, and that was all she needed now.
            One evening at work, she noticed a small girl nearby, completely
            absorbed in what she was doing, unaware of anything else. For a
            moment, it felt familiar—not the situation, but the way she looked
            so certain without needing a reason. It reminded her of a version of
            herself she hadn’t thought about in a long time, the one who once
            believed she would leave, that she would become something more than
            this. She watched for a few seconds, then looked away and returned
            to her work. There was nothing wrong with her life, nothing broken,
            but somewhere between what she had tried and what she had settled
            for, she had become someone who no longer expected anything more,
            and she understood, quietly, that this was how it would stay.
          </p>
        </div>
      </div>
    </>
  );
}
export default Page;
