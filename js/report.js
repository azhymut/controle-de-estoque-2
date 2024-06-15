// report.js

// Função para formatar a data no formato dia-mes-ano
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

// Função para gerar o relatório
function generateReport(data) {
    const reportTableBody = document.getElementById('report-output');
    reportTableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        const productNameCell = document.createElement('td');
        const productNameStrong = document.createElement('strong');
        productNameStrong.textContent = item.name;
        productNameCell.appendChild(productNameStrong);
        row.appendChild(productNameCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = item.category;
        row.appendChild(categoryCell);

        const expiryDateCell = document.createElement('td');
        expiryDateCell.textContent = formatDate(item.expiry);
        row.appendChild(expiryDateCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const batchCell = document.createElement('td');
        batchCell.textContent = item.batch;
        row.appendChild(batchCell);

        const supplierCell = document.createElement('td');
        supplierCell.textContent = item.supplier;
        row.appendChild(supplierCell);

        reportTableBody.appendChild(row);
    });
}

// Função fictícia para filtrar os dados conforme os dias até o vencimento
function filterDataByDays(data, days) {
    const now = new Date();
    return data.filter(item => {
        const expiryDate = new Date(item.expiry);
        const timeDiff = expiryDate - now;
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dayDiff <= days;
    });
}

// Simulação de dados para fins de teste
const data = [
    { name: "Produto A", category: "Alimentos", expiry: "2024-07-20", quantity: 50, batch: "Lote1", supplier: "Fornecedor A" },
    { name: "Produto B", category: "Bebidas", expiry: "2024-06-25", quantity: 30, batch: "Lote2", supplier: "Fornecedor B" },
    // Adicione mais produtos conforme necessário
];

// Adicionar evento ao botão após o DOM ser carregado
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate-report').addEventListener('click', () => {
        const daysFilter = document.getElementById('days-filter').value;
        const filteredData = filterDataByDays(data, daysFilter);
        generateReport(filteredData);
    });
});
