// API WARFARE FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabs = document.querySelectorAll('.api-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabId = tab.dataset.tab;
            document.querySelectorAll('.simulator-container').forEach(container => {
                container.classList.add('hidden');
            });
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // Load vulnerability database
    fetchAPIVulnerabilities();
    
    // Search and filter functionality
    document.getElementById('apiSearch').addEventListener('input', searchVulnerabilities);
    document.getElementById('apiFilter').addEventListener('change', searchVulnerabilities);
    
    // Simulate API request
    document.getElementById('sendRequest').addEventListener('click', simulateAPIRequest);
});

async function fetchAPIVulnerabilities() {
    try {
        const response = await fetch('assets/data/api-vulnerabilities.json');
        const data = await response.json();
        renderVulnerabilities(data.vulnerabilities);
    } catch (error) {
        console.error('Error loading API vulnerabilities:', error);
    }
}

function renderVulnerabilities(vulnerabilities) {
    const grid = document.getElementById('vulnGrid');
    grid.innerHTML = '';
    
    vulnerabilities.forEach(vuln => {
        const card = document.createElement('div');
        card.className = 'vuln-card';
        
        card.innerHTML = `
            <h3>${vuln.title}</h3>
            <div class="vuln-meta">
                <span class="vuln-type type-${vuln.type}">${vuln.type.toUpperCase()}</span>
                <span class="vuln-severity severity-${vuln.severity}">${vuln.severity.toUpperCase()}</span>
            </div>
            <p>${vuln.description}</p>
            <a href="#">
                <i class="fas fa-arrow-right"></i> VIEW EXPLOIT DETAILS
            </a>
        `;
        
        grid.appendChild(card);
    });
}

function searchVulnerabilities() {
    const searchTerm = document.getElementById('apiSearch').value.toLowerCase();
    const filterValue = document.getElementById('apiFilter').value;
    
    fetch('assets/data/api-vulnerabilities.json')
        .then(response => response.json())
        .then(data => {
            let filtered = data.vulnerabilities;
            
            // Apply type filter
            if (filterValue !== 'all') {
                filtered = filtered.filter(vuln => vuln.type === filterValue);
            }
            
            // Apply search filter
            if (searchTerm) {
                filtered = filtered.filter(vuln => 
                    vuln.title.toLowerCase().includes(searchTerm) ||
                    vuln.description.toLowerCase().includes(searchTerm) ||
                    vuln.example.toLowerCase().includes(searchTerm)
                );
            }
            
            renderVulnerabilities(filtered);
        });
}

function simulateAPIRequest() {
    const endpoint = document.getElementById('apiEndpoint').value;
    const headers = document.getElementById('apiHeaders').value;
    const payload = document.getElementById('apiPayload').value;
    
    // Simple validation
    if (!endpoint) {
        alert('Please enter an API endpoint');
        return;
    }
    
    // Generate random "findings"
    const findings = [
        "SQL Injection vulnerability detected in ID parameter",
        "JWT token missing signature verification",
        "Sensitive data exposure in response headers",
        "Rate limiting not implemented",
        "User enumeration possible via timing attack"
    ];
    
    const randomFinding = findings[Math.floor(Math.random() * findings.length)];
    
    // Display "results"
    document.getElementById('apiResponse').innerHTML = 
`<span class="json-key">"target"</span>: <span class="json-string">"${endpoint}"</span>
<span class="json-key">"status"</span>: <span class="json-value">"scan_complete"</span>
<span class="json-key">"findings"</span>: [
    <span class="json-string">"${randomFinding}"</span>
]`;
}