// BUG BOUNTY FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
    // Load vulnerability stats
    fetchBountyStats();
    
    // Initialize analytics chart
    initBountyChart();
});

async function fetchBountyStats() {
    try {
        const response = await fetch('assets/data/bounty-stats.json');
        const data = await response.json();
        renderVulnerabilityStats(data.vulnerabilities);
    } catch (error) {
        console.error('Error loading bounty stats:', error);
    }
}

function renderVulnerabilityStats(stats) {
    const container = document.getElementById('vulnStats');
    container.innerHTML = '';
    
    stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        statItem.innerHTML = `
            <h3>${stat.name}</h3>
            <div class="stat-bar">
                <div class="stat-bar-fill" style="width: ${stat.percentage}%"></div>
            </div>
            <div class="stat-meta">
                <span>${stat.percentage}% of reports</span>
                <span>Avg bounty: ${stat.avg_bounty}</span>
            </div>
            <div class="stat-trend">
                Trend: <span class="trend-${stat.trend}">${stat.trend}</span>
            </div>
        `;
        
        container.appendChild(statItem);
    });
}

function initBountyChart() {
    const ctx = document.getElementById('bountyChart').getContext('2d');
    
    // Sample data from HackerOne/Bugcrowd reports
    const bountyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['XSS', 'BAC', 'SQLi', 'SSRF', 'IDOR', 'CSRF', 'XXE'],
            datasets: [{
                label: 'Average Bounty ($)',
                data: [1200, 2500, 5000, 3800, 1500, 800, 4200],
                backgroundColor: [
                    'rgba(0, 255, 157, 0.7)',
                    'rgba(0, 161, 255, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 255, 157, 1)',
                    'rgba(0, 161, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                        font: {
                            family: "'Roboto Mono', monospace"
                        }
                    }
                }
            }
        }
    });
}