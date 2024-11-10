var tl = gsap.timeline()

tl.from("h5",
    {
        y:-20,
        opacity:0,
        duration:1,
        delay:0.5,
        stagger:0.3, 
    }
)

gsap.from("h6",
    {
        opacity:0,
        duraton:8,
        delay:6,
        y:-500,
    }
)


tl.from("h1",
    {
        // y:-20,
        // opacity:0,
        // duration:5,
        // delay:0.5,
        opacity:0,
        duration:1,
        delay:0.7,
        scale:0.3,
    }
)

