class AIModelsDashboard {
    constructor() {
        this.models = [];
        this.filteredModels = [];
        this.currentSort = { column: null, direction: 'asc' };
        this.activeFilters = new Set();
        this.providers = new Set();
        
        // CSV URLs
        this.csvUrl = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/a7121802c215fa8257dae6657eb87e5e/e68df3ef-184b-4b6e-91c1-4a11640f6c98/24bbc652.csv';
        this.headersUrl = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/a7121802c215fa8257dae6657eb87e5e/e68df3ef-184b-4b6e-91c1-4a11640f6c98/f5ce0f92.csv';
        this.lastUpdatedUrl = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/a7121802c215fa8257dae6657eb87e5e/e68df3ef-184b-4b6e-91c1-4a11640f6c98/77d148a5.txt';
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.setupTheme();
        await this.loadData();
    }

    setupEventListeners() {
        // Search input
        document.getElementById('searchInput').addEventListener('input', 
            this.debounce(this.handleSearch.bind(this), 300));
        
        // Filters
        document.getElementById('statusFilter').addEventListener('change', this.handleFilterChange.bind(this));
        document.getElementById('sourceFilter').addEventListener('change', this.handleFilterChange.bind(this));
        document.getElementById('dateFromFilter').addEventListener('change', this.handleFilterChange.bind(this));
        document.getElementById('dateToFilter').addEventListener('change', this.handleFilterChange.bind(this));
        
        // Clear filters
        document.getElementById('clearFilters').addEventListener('click', this.clearAllFilters.bind(this));
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', this.toggleTheme.bind(this));
        
        // Export button
        document.getElementById('exportBtn').addEventListener('click', this.exportToCSV.bind(this));
        
        // Table sorting
        document.addEventListener('click', (e) => {
            if (e.target.closest('.sortable')) {
                const column = e.target.closest('.sortable').dataset.column;
                this.sortTable(column);
            }
        });
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        this.updateThemeToggle(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('dashboard-theme', newTheme);
        this.updateThemeToggle(newTheme);
    }

    updateThemeToggle(theme) {
        const icon = document.querySelector('.theme-icon');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    async loadData() {
        try {
            const [csvData, lastUpdated] = await Promise.all([
                fetch(this.csvUrl).then(r => r.text()),
                fetch(this.lastUpdatedUrl).then(r => r.text()).catch(() => new Date().toISOString())
            ]);

            this.models = this.parseCSV(csvData);
            this.processModels();
            this.updateLastUpdated(lastUpdated.trim());
            this.setupFilters();
            this.renderTable();
            this.updateStatistics();
            this.renderProviderTags();
            
            // Hide loading state
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('modelsTable').style.display = 'table';
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError();
        }
    }

    parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        return lines.slice(1).map(line => {
            const values = this.parseCSVLine(line);
            const model = {};
            
            headers.forEach((header, index) => {
                let value = values[index] || '';
                
                // Convert specific fields
                if (header === 'context_length' || header === 'cost_per_1k_tokens') {
                    value = parseFloat(value) || 0;
                } else if (header === 'release_date') {
                    value = value || '1970-01-01';
                }
                
                model[header] = value;
            });
            
            return model;
        }).filter(model => model.model_name); // Filter out empty rows
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result.map(val => val.replace(/"/g, ''));
    }

    processModels() {
        this.models.forEach(model => {
            // Extract AI provider from model name
            model.ai_tab = this.extractProvider(model.model_name);
            this.providers.add(model.source);
        });
        
        this.filteredModels = [...this.models];
    }

    extractProvider(modelName) {
        const name = modelName.toLowerCase();
        
        if (name.includes('gpt') || name.includes('chatgpt')) return 'GPT';
        if (name.includes('claude')) return 'Claude';
        if (name.includes('gemini') || name.includes('bard')) return 'Gemini';
        if (name.includes('llama')) return 'LLaMA';
        if (name.includes('mistral') || name.includes('mixtral')) return 'Mistral';
        if (name.includes('command')) return 'Command';
        if (name.includes('deepseek')) return 'DeepSeek';
        if (name.includes('yi')) return 'Yi';
        if (name.includes('palm')) return 'PaLM';
        
        // Fallback to source
        return this.models.find(m => m.model_name === modelName)?.source || 'Other';
    }

    updateLastUpdated(dateString) {
        try {
            const date = new Date(dateString);
            const formatted = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('lastUpdatedDate').textContent = formatted;
        } catch (error) {
            document.getElementById('lastUpdatedDate').textContent = 'Recently';
        }
    }

    setupFilters() {
        // Populate source filter
        const sourceFilter = document.getElementById('sourceFilter');
        const sortedProviders = Array.from(this.providers).sort();
        
        sortedProviders.forEach(provider => {
            const option = document.createElement('option');
            option.value = provider;
            option.textContent = provider;
            sourceFilter.appendChild(option);
        });
    }

    handleSearch(event) {
        this.applyFilters();
    }

    handleFilterChange() {
        this.applyFilters();
    }

    applyFilters() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const sourceFilter = document.getElementById('sourceFilter').value;
        const dateFrom = document.getElementById('dateFromFilter').value;
        const dateTo = document.getElementById('dateToFilter').value;

        this.filteredModels = this.models.filter(model => {
            // Search filter
            if (searchTerm) {
                const searchFields = [
                    model.model_name,
                    model.source,
                    model.ai_tab,
                    model.status,
                    model.parameters
                ].join(' ').toLowerCase();
                
                if (!searchFields.includes(searchTerm)) return false;
            }

            // Status filter
            if (statusFilter !== 'all' && model.status !== statusFilter) return false;

            // Source filter
            if (sourceFilter !== 'all' && model.source !== sourceFilter) return false;

            // Date filters
            if (dateFrom && model.release_date < dateFrom) return false;
            if (dateTo && model.release_date > dateTo) return false;

            return true;
        });

        this.updateActiveFilters();
        this.renderTable();
        this.updateStatistics();
    }

    updateActiveFilters() {
        const activeFilters = [];
        const searchTerm = document.getElementById('searchInput').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const sourceFilter = document.getElementById('sourceFilter').value;
        const dateFrom = document.getElementById('dateFromFilter').value;
        const dateTo = document.getElementById('dateToFilter').value;

        if (searchTerm) activeFilters.push({ type: 'search', value: searchTerm });
        if (statusFilter !== 'all') activeFilters.push({ type: 'status', value: statusFilter });
        if (sourceFilter !== 'all') activeFilters.push({ type: 'source', value: sourceFilter });
        if (dateFrom) activeFilters.push({ type: 'dateFrom', value: dateFrom });
        if (dateTo) activeFilters.push({ type: 'dateTo', value: dateTo });

        this.renderActiveTags(activeFilters);
    }

    renderActiveTags(filters) {
        const activeTagsSection = document.getElementById('activeTags');
        const tagsContainer = document.getElementById('tagsContainer');

        if (filters.length === 0) {
            activeTagsSection.style.display = 'none';
            return;
        }

        activeTagsSection.style.display = 'block';
        tagsContainer.innerHTML = '';

        filters.forEach(filter => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            
            let displayValue = filter.value;
            if (filter.type === 'dateFrom') displayValue = `From: ${filter.value}`;
            if (filter.type === 'dateTo') displayValue = `To: ${filter.value}`;
            
            tag.innerHTML = `
                ${displayValue}
                <button class="tag-close" onclick="dashboard.removeFilter('${filter.type}', '${filter.value}')">×</button>
            `;
            
            tagsContainer.appendChild(tag);
        });
    }

    removeFilter(type, value) {
        switch (type) {
            case 'search':
                document.getElementById('searchInput').value = '';
                break;
            case 'status':
                document.getElementById('statusFilter').value = 'all';
                break;
            case 'source':
                document.getElementById('sourceFilter').value = 'all';
                break;
            case 'dateFrom':
                document.getElementById('dateFromFilter').value = '';
                break;
            case 'dateTo':
                document.getElementById('dateToFilter').value = '';
                break;
        }
        this.applyFilters();
    }

    clearAllFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('statusFilter').value = 'all';
        document.getElementById('sourceFilter').value = 'all';
        document.getElementById('dateFromFilter').value = '';
        document.getElementById('dateToFilter').value = '';
        this.applyFilters();
    }

    sortTable(column) {
        if (this.currentSort.column === column) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.column = column;
            this.currentSort.direction = 'asc';
        }

        this.filteredModels.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];

            // Handle different data types
            if (column === 'cost_per_1k_tokens' || column === 'context_length') {
                aVal = parseFloat(aVal) || 0;
                bVal = parseFloat(bVal) || 0;
            } else if (column === 'release_date') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            } else {
                aVal = String(aVal).toLowerCase();
                bVal = String(bVal).toLowerCase();
            }

            let result = 0;
            if (aVal < bVal) result = -1;
            if (aVal > bVal) result = 1;

            return this.currentSort.direction === 'desc' ? -result : result;
        });

        this.renderTable();
        this.updateSortIndicators();
    }

    updateSortIndicators() {
        // Clear all indicators
        document.querySelectorAll('.sort-indicator').forEach(indicator => {
            indicator.className = 'sort-indicator';
        });

        // Set current indicator
        if (this.currentSort.column) {
            const header = document.querySelector(`[data-column="${this.currentSort.column}"] .sort-indicator`);
            if (header) {
                header.className = `sort-indicator ${this.currentSort.direction}`;
            }
        }
    }

    renderTable() {
        const tbody = document.getElementById('modelsTableBody');
        tbody.innerHTML = '';

        this.filteredModels.forEach(model => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="model-name">${this.escapeHtml(model.model_name)}</span></td>
                <td><span class="ai-provider-badge">${this.escapeHtml(model.ai_tab)}</span></td>
                <td><span class="status-badge status-badge--${this.getStatusClass(model.status)}">${this.escapeHtml(model.status)}</span></td>
                <td>${this.escapeHtml(model.source)}</td>
                <td><span class="release-date">${this.formatDate(model.release_date)}</span></td>
                <td><span class="parameters">${this.escapeHtml(model.parameters)}</span></td>
                <td><span class="context-length">${this.formatNumber(model.context_length)}</span></td>
                <td><span class="cost-cell">$${this.formatCost(model.cost_per_1k_tokens)}</span></td>
            `;
            tbody.appendChild(row);
        });

        // Update table count
        document.getElementById('tableCount').textContent = this.filteredModels.length;
    }

    getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'available': return 'available';
            case 'limited access': return 'limited';
            case 'deprecated': return 'deprecated';
            default: return 'available';
        }
    }

    formatDate(dateString) {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    }

    formatNumber(num) {
        if (!num || num === 0) return '-';
        return new Intl.NumberFormat().format(num);
    }

    formatCost(cost) {
        if (!cost || cost === 0) return '0.00';
        return cost.toFixed(4);
    }

    updateStatistics() {
        const total = this.filteredModels.length;
        const available = this.filteredModels.filter(m => m.status === 'Available').length;
        const avgCost = total > 0 ? 
            this.filteredModels.reduce((sum, m) => sum + (parseFloat(m.cost_per_1k_tokens) || 0), 0) / total : 0;
        
        // Calculate top provider
        const providerCounts = {};
        this.filteredModels.forEach(m => {
            providerCounts[m.source] = (providerCounts[m.source] || 0) + 1;
        });
        const topProvider = Object.keys(providerCounts).reduce((a, b) => 
            providerCounts[a] > providerCounts[b] ? a : b, '-');

        document.getElementById('totalModels').textContent = total;
        document.getElementById('availableModels').textContent = available;
        document.getElementById('avgCost').textContent = `$${avgCost.toFixed(4)}`;
        document.getElementById('topProvider').textContent = topProvider;
    }

    renderProviderTags() {
        const container = document.getElementById('providerTags');
        const uniqueProviders = [...new Set(this.models.map(m => m.ai_tab))].sort();

        container.innerHTML = '';
        uniqueProviders.forEach(provider => {
            const tag = document.createElement('div');
            tag.className = `provider-tag provider-tag--${this.getProviderClass(provider)}`;
            tag.textContent = provider;
            tag.addEventListener('click', () => this.filterByProvider(provider));
            container.appendChild(tag);
        });
    }

    getProviderClass(provider) {
        const name = provider.toLowerCase();
        if (name.includes('gpt') || name.includes('openai')) return 'openai';
        if (name.includes('claude') || name.includes('anthropic')) return 'anthropic';
        if (name.includes('gemini') || name.includes('google')) return 'google';
        if (name.includes('llama') || name.includes('meta')) return 'meta';
        if (name.includes('mistral')) return 'mistral';
        if (name.includes('command') || name.includes('cohere')) return 'cohere';
        return 'default';
    }

    filterByProvider(provider) {
        document.getElementById('searchInput').value = provider;
        this.applyFilters();
    }

    exportToCSV() {
        const headers = ['Model Name', 'AI Provider', 'Status', 'Source', 'Release Date', 'Parameters', 'Context Length', 'Cost per 1K Tokens'];
        const csvContent = [
            headers.join(','),
            ...this.filteredModels.map(model => [
                `"${model.model_name}"`,
                `"${model.ai_tab}"`,
                `"${model.status}"`,
                `"${model.source}"`,
                `"${model.release_date}"`,
                `"${model.parameters}"`,
                model.context_length,
                model.cost_per_1k_tokens
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-models-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    showError() {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('errorState').style.display = 'flex';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new AIModelsDashboard();
});

// Global functions for inline event handlers
window.removeFilter = (type, value) => {
    window.dashboard.removeFilter(type, value);
};