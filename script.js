async function init() {
    try {
        const response = await fetch("./menu.json");
        const data = await response.json();
        
        const nav = document.getElementById("category-nav");
        const container = document.getElementById("menu-container");
        container.innerHTML = ""; 

        data.categories.forEach(cat => {
            // Navigasyon oluştur
            const link = document.createElement("a");
            link.href = `#${cat.id}`;
            link.innerText = cat.title;
            nav.appendChild(link);

            // Kategori bölümü oluştur
            const section = document.createElement("section");
            section.id = cat.id;
            section.innerHTML = `<h2>${cat.title}</h2>`;
            
            cat.items.forEach(item => {
                section.innerHTML += `
                    <div class="product-card">
                        <div class="info">
                            <h3>${item.name} ${item.tag ? `<span class="tag">${item.tag}</span>` : ""}</h3>
                        </div>
                        <p class="price">${item.price} ${data.restaurantInfo.currency}</p>
                    </div>
                `;
            });
            container.appendChild(section);
        });
    } catch (error) { console.error("Hata:", error); }
}
init();
