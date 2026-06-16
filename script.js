async function init() {
    const container = document.getElementById("menu-container");
    const nav = document.getElementById("category-nav");

    try {
        const response = await fetch("./data/menu.json");

        if (!response.ok) {
            throw new Error("Veri yüklenemedi");
        }

        const data = await response.json();

        container.innerHTML = "";
        nav.innerHTML = "";

        data.categories
            .sort((a, b) => a.order - b.order)
            .forEach(cat => {

                // Navigasyon
                const navLink = document.createElement("a");
                navLink.href = `#${cat.id}`;
                navLink.className = "nav-link";
                navLink.innerText = cat.title;
                nav.appendChild(navLink);

                // Kategori
                const section = document.createElement("section");
                section.id = cat.id;

                section.innerHTML = `
                    <h2 class="category-title">
                        ${cat.title}
                    </h2>
                `;

                cat.items.forEach(item => {

                    if (!item.available) return;

                    const card = document.createElement("div");

                    card.className = "product-card";
                    card.dataset.sku = item.sku;

                    card.innerHTML = `
                        <div>
                            <h3 class="product-name">
                                ${item.name}
                            </h3>

                            ${
                                item.tag
                                    ? `<span class="tag">${item.tag}</span>`
                                    : ""
                            }
                        </div>

                        <p class="price">
                            ${item.price}
                            ${data.restaurantInfo.currency}
                        </p>
                    `;

                    section.appendChild(card);
                });

                container.appendChild(section);
            });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p class="error-message">
                Menü şu an yüklenemiyor.
            </p>
        `;
    }
}
function setupScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        });

    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}
init();
