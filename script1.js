

document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname.split("/").pop() || "home.html";

    const navLinks = document.querySelectorAll("header nav a");

    navLinks.forEach(function (link) {

        const href = link.getAttribute("href");

        if (href && href !== "") {

            const linkPage = href.split("/").pop();

            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        }
    });




    const registerForm =
        document.querySelector(".form-container form");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const inputs =
                registerForm.querySelectorAll("input");

            const selects =
                registerForm.querySelectorAll("select");

            const textarea =
                registerForm.querySelector("textarea");



            const fullName =
                inputs[0].value.trim();

            const phone =
                inputs[1].value.trim();

            const email =
                inputs[2].value.trim();

            const location =
                selects[0].value;

            const category =
                selects[1].value;

            const experience =
                inputs[3].value.trim();

            const services =
                textarea.value.trim();

            if (
                fullName === "" ||
                phone === "" ||
                email === "" ||
                location === "Select District" ||
                category === "Select Service"
            ) {

                showMessage(
                    "Please complete all required information.",
                    "error"
                );

                return;
            }

            const phonePattern =
                /^(?:\+250|250)?\s?7\d{2}\s?\d{3}\s?\d{3}$/;

            const cleanPhone =
                phone.replace(/-/g, "");


            if (!phonePattern.test(cleanPhone)) {

                showMessage(
                    "Please enter a valid Rwanda phone number. Example: +250 788 000 000",
                    "error"
                );

                return;
            }



            const technician = {

                id: Date.now(),

                fullName: fullName,

                phone: phone,

                email: email,

                location: location,

                category: category,

                experience:
                    experience || "Not specified",

                services:
                    services || "Professional technician services",

                registeredAt:
                    new Date().toISOString()

            };


            let technicians =
                JSON.parse(
                    localStorage.getItem(
                        "techlinkTechnicians"
                    ) || "[]"
                );

            technicians.push(technician);


            localStorage.setItem(
                "techlinkTechnicians",
                JSON.stringify(technicians)
            );

            showMessage(
                "Registration successful! Welcome to TechLink Rwanda.",
                "success"
            );

            registerForm.reset();


    

            setTimeout(function () {

                window.location.href =
                    "profile.html";

            }, 1800);

        });

    }

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                contactForm
                    .querySelector('input[type="text"]')
                    .value.trim();


            const email =
                contactForm
                    .querySelector('input[type="email"]')
                    .value.trim();


            const message =
                contactForm
                    .querySelector("textarea")
                    .value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                showMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }

            let messages =
                JSON.parse(
                    localStorage.getItem(
                        "techlinkMessages"
                    ) || "[]"
                );


            messages.push({

                id: Date.now(),

                name: name,

                email: email,

                message: message,

                date:
                    new Date().toLocaleString()

            });


            localStorage.setItem(
                "techlinkMessages",
                JSON.stringify(messages)
            );


            showMessage(
                "Thank you! Your message has been sent.",
                "success"
            );


            contactForm.reset();

        });

    }

    const serviceCards =
        document.querySelectorAll(".service-card");


    serviceCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const serviceTitle =
                card.querySelector("h3");


            if (!serviceTitle) {
                return;
            }


            const service =
                serviceTitle.textContent.trim();


         

            localStorage.setItem(
                "selectedTechLinkService",
                service
            );

            window.location.href =
                "technicians.html?service=" +
                encodeURIComponent(service);

        });

    });

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const selectedService =
        urlParams.get("service");


    if (selectedService) {

        localStorage.setItem(
            "selectedTechLinkService",
            selectedService
        );


        const serviceHeading =
            document.getElementById(
                "selectedService"
            );


        if (serviceHeading) {

            serviceHeading.textContent =
                "Technicians for " +
                selectedService;

        }
    

    }


    

    const contactButton =
        document.querySelector(
            ".profile-information .btn"
        );


    if (contactButton) {

        contactButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const technicianName =
                    document.querySelector(
                        ".profile-information h1"
                    )?.textContent.trim()
                    || "Technician";


                let phone =
                    "250788000000";


                const paragraphs =
                    document.querySelectorAll(
                        ".profile-information p"
                    );


                paragraphs.forEach(function (paragraph) {

                    const number =
                        paragraph.textContent.match(
                            /(?:\+?250\s?)?7\d{2}\s?\d{3}\s?\d{3}/
                        );


                    if (number) {

                        phone =
                            number[0]
                                .replace(/\s/g, "")
                                .replace("+", "");


                        if (!phone.startsWith("250")) {

                            phone =
                                "250" + phone;

                        }

                    }

                });


                const message =
                    "Hello " +
                    technicianName +
                    ", I found your profile on TechLink Rwanda. I would like to request your service.";


                const whatsappURL =
                    "https://wa.me/" +
                    phone +
                    "?text=" +
                    encodeURIComponent(message);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    const rating =
        document.querySelector(".rating-large strong");


    if (rating) {

        rating.style.cursor = "pointer";


        rating.addEventListener(
            "click",
            function () {

                const userRating =
                    prompt(
                        "Rate this technician from 1 to 5:"
                    );


                if (userRating === null) {
                    return;
                }


                const number =
                    Number(userRating);


                if (
                    !Number.isInteger(number) ||
                    number < 1 ||
                    number > 5
                ) {

                    showMessage(
                        "Please enter a number between 1 and 5.",
                        "error"
                    );

                    return;
                }


                rating.textContent =
                    number + " / 5";


                localStorage.setItem(
                    "techlinkRating",
                    number
                );


                showMessage(
                    "Thank you for your rating!",
                    "success"
                );

            }
        );

    }



    const technicianCount =
        document.getElementById(
            "technicianCount"
        );


    if (technicianCount) {

        const technicians =
            JSON.parse(
                localStorage.getItem(
                    "techlinkTechnicians"
                ) || "[]"
            );


        technicianCount.textContent =
            technicians.length;

    }


   

    const faqQuestions =
        document.querySelectorAll(
            ".faq-question"
        );


    faqQuestions.forEach(function (question) {

        question.addEventListener(
            "click",
            function () {

                const answer =
                    question.nextElementSibling;


                if (
                    answer &&
                    answer.classList.contains(
                        "faq-answer"
                    )
                ) {

                    answer.classList.toggle(
                        "show"
                    );

                }

            }
        );

    });

});


function showMessage(message, type) {

    let box =
        document.getElementById(
            "techlinkMessage"
        );


    

    if (!box) {

        box =
            document.createElement("div");

        box.id =
            "techlinkMessage";


        box.style.position =
            "fixed";

        box.style.top =
            "20px";

        box.style.right =
            "20px";

        box.style.zIndex =
            "9999";

        box.style.padding =
            "15px 20px";

        box.style.borderRadius =
            "10px";

        box.style.fontFamily =
            "Arial, sans-serif";

        box.style.fontWeight =
            "bold";

        box.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.2)";


        document.body.appendChild(box);

    }


    box.textContent =
        message;


    

    if (type === "success") {

        box.style.background =
            "#d1fae5";

        box.style.color =
            "#065f46";

        box.style.border =
            "1px solid #10b981";

    }


    

    else {

        box.style.background =
            "#fee2e2";

        box.style.color =
            "#991b1b";

        box.style.border =
            "1px solid #ef4444";

    }


    clearTimeout(
        window.techlinkTimer
    );


    window.techlinkTimer =
        setTimeout(function () {

            box.remove();

        }, 4000);

}