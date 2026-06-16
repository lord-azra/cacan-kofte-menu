async function init() {
    try {
        const response = await fetch("./menu.json");
        const data = await response.json();
        
        console.log("Veri çekildi:", data);
        
        const container = document.getElementById("menu-container");
        container.innerHTML = ""; // "Menü yükleniyor..." yazısını temizle

        data.categories.forEach(cat => {
            const section = document.createElement("section");
            section.innerHTML = `<h2>${cat.title}</h2>`;
            
            cat.items.forEach(item => {
                section.innerHTML += `
                    <div class="product-card">
                        <h3>${item.name}</h3>
                        <p>${item.price} ${data.restaurantInfo.currency}</p>
                    </div>
                `;
            });
            container.appendChild(section);
        });
        
    } catch (error) {
        console.error("Hata oluştu:", error);
    }
}

init();
