document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginSidebar = document.getElementById('login-sidebar');
    const registerSidebar = document.getElementById('register-sidebar');
    const closeLoginBtn = document.getElementById('close-login-btn');
    const closeRegisterBtn = document.getElementById('close-register-btn');

    loginBtn.addEventListener('click', function () {
        loginSidebar.classList.toggle('active');
        registerSidebar.classList.remove('active');
    });

    registerBtn.addEventListener('click', function () {
        registerSidebar.classList.toggle('active');
        loginSidebar.classList.remove('active');
    });

    closeLoginBtn.addEventListener('click', function () {
        loginSidebar.classList.remove('active');
    });

    closeRegisterBtn.addEventListener('click', function () {
        registerSidebar.classList.remove('active');
    });
});

//CRUD
document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    let products = [];
    let currentProductId = null;

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const productId = document.getElementById('productId').value;
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productSKU = document.getElementById('productSKU').value;
        const productImage = document.getElementById('productImage').files[0]; // Obtener el archivo de imagen

        let imageUrl = ''; // Inicializar la URL de la imagen como vacía
        if (productImage) {
            // Si se ha cargado una imagen
            imageUrl = URL.createObjectURL(productImage); // Crear una URL local para la imagen
        }

        if (productId) {
            // Update product
            products = products.map(product => 
                product.id === parseInt(productId) ? { id: product.id, name: productName, price: productPrice, sku: productSKU, image: imageUrl } : product
            );
        } else {
            // Add new product
            const newProduct = {
                id: products.length + 1,
                name: productName,
                price: productPrice,
                sku: productSKU,
                image: imageUrl
            };
            products.push(newProduct);
        }

        resetForm();
        renderTable();
    });

    function renderTable() {
        productTable.innerHTML = '';
        products.forEach(product => {
            const row = productTable.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.sku}</td>
                <td>${product.image ? `<img src="${product.image}" alt="Product Image" style="max-width: 100px;">` : 'No Image'}</td>
                <td class="actions">
                    <button class="edit" onclick="editProduct(${product.id})">Editar</button>
                    <button class="delete" onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            `;
        });
    }

    function resetForm() {
        document.getElementById('productId').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productSKU').value = '';
        document.getElementById('productImage').value = ''; // Limpiar el campo de entrada de la imagen
        currentProductId = null;
    }

    window.editProduct = function (id) {
        const product = products.find(product => product.id === id);
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productSKU').value = product.sku;
    };

    window.deleteProduct = function (id) {
        products = products.filter(product => product.id !== id);
        renderTable();
    };
});
