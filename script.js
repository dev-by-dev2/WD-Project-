// console.log("GSAP working:", typeof gsap !== "undefined");

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    // gsap.registerPlugin(ScrollTrigger);
    // Theme Toggling Logic
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved theme or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        root.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- GSAP Animations ---

    // 1. Hero Section Animation
    // gsap.from(".hero-content", {
    //     opacity: 0,
    //     y: 100,
    //     duration: 1.2,
    //     ease: "power3.out"
    // });

    // 2. Cards Stagger Animation
    // gsap.from(".card", {
    //     scrollTrigger: {
    //         trigger: ".features",
    //         start: "top 95%",
    //         toggleActions: "play none none none"
    //     },
    //     opacity: 0,
    //     y: 150,
    //     stagger: 0.3,
    //     duration: 1.2,
    //     ease: "power2.out"
    // });

    // 3. Info Section Animation
    // gsap.from(".info-card", {
    //     scrollTrigger: {
    //         trigger: ".info-card",
    //         start: "top 95%"
    //     },
    //     opacity: 0,
    //     y: 150,
    //     duration: 1.2,
    //     ease: "power2.out"
    // });

    // Optional Enhancement: Parallax effect for .hero::before
    // const style = document.createElement('style');
    // style.innerHTML = `
    //     .hero::before {
    //         transform: translateY(var(--parallax-y, 0px));
    //     }
    // `;
    // document.head.appendChild(style);

    // gsap.fromTo(".hero",
    //     { "--parallax-y": "0px" },
    //     {
    //         "--parallax-y": "-100px",
    //         scrollTrigger: {
    //             trigger: ".hero",
    //             start: "top top",
    //             end: "bottom top",
    //             scrub: true
    //         }
    //     }
    // );

    // Test Animation
    // gsap.from("body", {
    //     opacity: 0,
    //     duration: 1
    // });
});

// --- Dish Review Modal System ---
const dishDescriptions = {
"paneer-peshawari": "Rich, creamy paneer cooked in a mildly sweet gravy with dry fruits.",
"paneer-lajawab": "A flavorful paneer dish with a perfectly balanced spicy and creamy taste.",
"paneer-pasanda": "Stuffed paneer slices cooked in a luxurious, creamy gravy.",
"paneer-tikka-masala": "Smoky paneer tikka pieces in a spicy tomato-based gravy.",
"paneer-bhurji": "Scrambled paneer cooked with spices, onions, and tomatoes.",
"paneer-makhanwala": "Classic buttery paneer dish with a rich tomato base.",
"paneer-mutter": "Paneer and peas cooked in a mildly spiced curry.",
"paneer-palak": "Paneer cubes in a smooth spinach gravy.",
"paneer-kadhai": "Spicy paneer cooked with capsicum and onions in kadhai masala.",
"paneer-handi": "Thick, creamy paneer gravy cooked in traditional style.",
"paneer-shahi-korma": "Royal creamy dish with rich flavors and subtle sweetness.",
"paneer-tadka": "Simple yet flavorful paneer cooked with strong tempering.",
"soya-masala": "Protein-rich soya chunks cooked in spicy masala gravy.",
"paneer-butter-masala": "Most loved creamy and buttery paneer dish.",
"tawa-paneer": "Paneer cooked on a flat tawa with bold spices.",
"kaju-kolhapuri": "Cashew-based spicy curry with a Kolhapuri kick.",
"kaju-masala": "Rich cashew curry with a smooth, creamy texture.",
"cheese-butter-masala": "Cheesy twist on classic butter masala.",
"cheese-tikka-masala": "Grilled cheese cubes in spicy masala gravy.",
"veg-makhanwala": "Mixed vegetables in a buttery tomato gravy.",
"paneer-mushroom-masala": "Paneer and mushrooms cooked in rich masala.",
"veg-peshawari": "Sweet and creamy vegetable curry with dry fruits.",
"veg-lahori": "North Indian style rich vegetable curry.",
"veg-hyderabadi": "Spicy and aromatic vegetable curry with Hyderabadi flavors.",
"veg-kolhapuri": "Bold and spicy vegetable dish.",
"mix-veg": "Simple mixed vegetables in light gravy.",
"green-peas-masala": "Green peas cooked in flavorful masala.",
"aloo-mutter": "Potato and peas curry, classic comfort dish.",
"paneer-lasooni": "Garlic-flavored paneer curry with strong taste.",
"rajma-masala": "Kidney beans cooked in thick spicy gravy.",
"channa-masala": "Chickpeas cooked in tangy masala.",
"malai-methi-mutter": "Creamy dish with fenugreek and peas.",
"dal-tadka": "Yellow dal with strong tempering of spices.",
"dal-fry": "Simple and comforting dal dish.",
"dal-makhani": "Slow-cooked creamy black dal.",
"dum-aloo": "Baby potatoes cooked in rich gravy.",
"aloo-jeera": "Dry potato dish with cumin flavor.",
"aloo-gobhi": "Potato and cauliflower cooked with spices.",
"veg-tawa": "Vegetables tossed on hot tawa with spices.",
"bhendi-fry": "Crispy okra stir-fry.",
"bhendi-masala": "Okra cooked in thick masala gravy.",
"baby-corn-masala": "Baby corn in spicy gravy.",
"baby-corn-mushroom": "Combination of baby corn and mushroom in rich sauce"
};

let currentDish = "";

function openDish(name, price) {
    currentDish = name;

    document.getElementById("dishModal").classList.remove("hidden");
    document.getElementById("dishName").innerText = name.replace(/-/g, ' ').toUpperCase();
    document.getElementById("dishPrice").innerText = "₹" + price;

    document.querySelector(".dish-desc").innerText = dishDescriptions[name] || "A delicious dish worth trying.";

    // Reset review form state
    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm && !reviewForm.classList.contains("hidden")) {
        reviewForm.classList.add("hidden");
    }

    loadReviews();
}

function closeDish() {
    document.getElementById("dishModal").classList.add("hidden");
}

function toggleReviewForm() {
    document.getElementById("reviewForm").classList.toggle("hidden");
}

async function submitReview() {
    const rating = Number(document.getElementById("ratingInput").value);
    const text = document.getElementById("reviewText").value;

    if (isNaN(rating) || rating < 0 || rating > 5) {
        alert("Rating must be between 0 and 5");
        return;
    }

    await fetch(`/reviews/${currentDish}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rating: rating,
            text: text
        })
    });

    // Clear input fields
    document.getElementById("ratingInput").value = "";
    document.getElementById("reviewText").value = "";
    document.getElementById("reviewForm").classList.add("hidden");

    loadReviews();
}

async function loadReviews() {
    const res = await fetch(`/reviews/${currentDish}`);
    const reviews = await res.json();

    let list = document.getElementById("reviewsList");
    list.innerHTML = "";

    let total = 0;

    reviews.forEach(r => {
        total += Number(r.rating);

        list.innerHTML += `
            <div class="review">
                ⭐ ${r.rating}
                <p>${r.text}</p>
            </div>
        `;
    });

    let avg = reviews.length ? (total / reviews.length).toFixed(1) : 0;

    document.getElementById("avgRating").innerText = avg;
}

// Close modal when clicking outside the content
document.addEventListener('click', function(e) {
    const modal = document.getElementById("dishModal");
    if (modal && e.target === modal) {
        closeDish();
    }
});
