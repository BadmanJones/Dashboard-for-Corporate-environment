//SIDEBAR TOGGLE
var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if(sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

// CHART DISPLAY FUNCTIONS
function showChart(chartType) {
    const chartSection = document.getElementById('chartSection');
    const chartTitle = document.getElementById('chartSectionTitle');
    
    // Hide all chart views
    const allChartViews = document.querySelectorAll('.chart-view');
    allChartViews.forEach(view => view.classList.add('hidden'));
    
    // Show the chart section
    chartSection.classList.remove('hidden');
    
    // Update sidebar active state
    updateSidebarActive();
    
    // Show specific chart based on type
    switch(chartType) {
        case 'totalTickets':
            chartTitle.textContent = 'Total Tickets Analysis';
            document.getElementById('totalTicketsChart').classList.remove('hidden');
            renderTotalTicketsCharts();
            break;
        case 'resolvedUnClosed':
            chartTitle.textContent = 'Resolved (Unclosed) Tickets';
            document.getElementById('resolvedUnClosedChart').classList.remove('hidden');
            renderResolvedUnClosedCharts();
            break;
        case 'resolvedClosed':
            chartTitle.textContent = 'Resolved & Closed Tickets';
            document.getElementById('resolvedClosedChart').classList.remove('hidden');
            renderResolvedClosedCharts();
            break;
        case 'outstanding':
            chartTitle.textContent = 'Outstanding Issues Analysis';
            document.getElementById('outstandingChart').classList.remove('hidden');
            renderOutstandingCharts();
            break;
        case 'avgResolution':
            chartTitle.textContent = 'Resolution Time Analysis';
            document.getElementById('avgResolutionChart').classList.remove('hidden');
            renderAvgResolutionCharts();
            break;
        case 'reports':
            chartTitle.textContent = 'Comprehensive Reports';
            document.getElementById('reportsChart').classList.remove('hidden');
            renderReportsCharts();
            break;
    }
    
    // Scroll to chart section
    chartSection.scrollIntoView({ behavior: 'smooth' });
}

function hideChartSection() {
    document.getElementById('chartSection').classList.add('hidden');
    // Reset sidebar to dashboard
    showDashboard();
}

function showDashboard() {
    // Hide chart section
    document.getElementById('chartSection').classList.add('hidden');
    
    // Update sidebar active state
    updateSidebarActive('dashboard');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSidebarActive(activeItem = 'chart') {
    const sidebarItems = document.querySelectorAll('.sidebar-list-item');
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    if (activeItem === 'dashboard') {
        sidebarItems[0].classList.add('active');
    }
}

// CHART RENDERING FUNCTIONS

// 1. Total Tickets Charts
function renderTotalTicketsCharts() {
    // Monthly Trend Chart
    const monthlyOptions = {
        chart: { type: 'area', height: 300 },
        series: [{
            name: 'Created',
            data: [189, 210, 165, 190, 145, 220]
        }, {
            name: 'Resolved',
            data: [156, 185, 190, 175, 160, 195]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        colors: ['#3b82f6', '#16a34a'],
        fill: { opacity: 0.3 },
        stroke: { curve: 'smooth', width: 2 }
    };
    
    // Status Breakdown Chart
    const statusOptions = {
        chart: { type: 'pie', height: 300 },
        series: [71.4, 16.1, 12.5],
        labels: ['Resolved & Closed', 'Outstanding', 'Resolved (Unclosed)'],
        colors: ['#16a34a', '#ef4444', '#f97316'],
        legend: { position: 'bottom' }
    };
    
    new ApexCharts(document.querySelector("#totalTicketsMonthly"), monthlyOptions).render();
    new ApexCharts(document.querySelector("#totalTicketsStatus"), statusOptions).render();
}

// 2. Resolved Unclosed Charts
function renderResolvedUnClosedCharts() {
    // By Department Chart
    const deptOptions = {
        chart: { type: 'bar', height: 300 },
        series: [{
            name: 'Resolved (Unclosed)',
            data: [67, 34, 28, 27]
        }],
        xaxis: {
            categories: ['IT Support', 'Billing', 'HR', 'General']
        },
        colors: ['#f97316'],
        plotOptions: {
            bar: { borderRadius: 4, horizontal: false }
        }
    };
    
    // Resolution Time Distribution
    const timeOptions = {
        chart: { type: 'donut', height: 300 },
        series: [45, 30, 15, 10],
        labels: ['0-2 days', '3-5 days', '6-10 days', '10+ days'],
        colors: ['#16a34a', '#eab308', '#f97316', '#ef4444'],
        legend: { position: 'bottom' }
    };
    
    new ApexCharts(document.querySelector("#resolvedUnClosedDept"), deptOptions).render();
    new ApexCharts(document.querySelector("#resolutionTimeChart"), timeOptions).render();
}

// 3. Resolved & Closed Charts
function renderResolvedClosedCharts() {
    // Weekly Progress Chart
    const weeklyOptions = {
        chart: { type: 'line', height: 300 },
        series: [{
            name: 'Closed Tickets',
            data: [23, 45, 32, 67, 49, 38, 41]
        }],
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        colors: ['#16a34a'],
        stroke: { curve: 'smooth', width: 3 },
        markers: { size: 6 }
    };
    
    // Closed by Category Chart
    const categoryOptions = {
        chart: { type: 'bar', height: 300 },
        series: [{
            name: 'Closed Tickets',
            data: [298, 187, 156, 134, 89, 27]
        }],
        xaxis: {
            categories: ['Technical', 'Account', 'Billing', 'General', 'Feature', 'Bug'],
            labels: { rotate: -45 }
        },
        colors: ['#16a34a'],
        plotOptions: {
            bar: { borderRadius: 4 }
        }
    };
    
    new ApexCharts(document.querySelector("#resolvedClosedWeekly"), weeklyOptions).render();
    new ApexCharts(document.querySelector("#closedByCategory"), categoryOptions).render();
}

// 4. Outstanding Issues Charts
function renderOutstandingCharts() {
    // By Priority Chart
    const priorityOptions = {
        chart: { type: 'donut', height: 300 },
        series: [8, 32, 89, 71],
        labels: ['Emergency', 'High', 'Normal', 'Low'],
        colors: ['#8e44ad', '#ef4444', '#f97316', '#16a34a'],
        legend: { position: 'bottom' }
    };
    
    // Age Distribution Chart
    const ageOptions = {
        chart: { type: 'bar', height: 300 },
        series: [{
            name: 'Outstanding Tickets',
            data: [45, 67, 52, 28, 8]
        }],
        xaxis: {
            categories: ['0-2 days', '3-7 days', '1-2 weeks', '2-4 weeks', '1+ month']
        },
        colors: ['#ef4444'],
        plotOptions: {
            bar: { borderRadius: 4 }
        }
    };
    
    new ApexCharts(document.querySelector("#outstandingByPriority"), priorityOptions).render();
    new ApexCharts(document.querySelector("#outstandingByAge"), ageOptions).render();
}

// 5. Average Resolution Charts
function renderAvgResolutionCharts() {
    // Resolution Trends Chart
    const trendsOptions = {
        chart: { type: 'line', height: 300 },
        series: [{
            name: 'Avg Resolution Time (Days)',
            data: [2.8, 2.5, 2.3, 2.1, 2.3, 2.0]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        colors: ['#3b82f6'],
        stroke: { curve: 'smooth', width: 3 },
        markers: { size: 6 }
    };
    
    // By Priority Chart
    const priorityResOptions = {
        chart: { type: 'bar', height: 300 },
        series: [{
            name: 'Avg Resolution Days',
            data: [0.3, 1.2, 2.8, 5.1]
        }, {
            name: 'SLA Target Days',
            data: [0.5, 1.0, 3.0, 7.0]
        }],
        xaxis: {
            categories: ['Emergency', 'High', 'Normal', 'Low']
        },
        colors: ['#3b82f6', '#ef4444'],
        plotOptions: {
            bar: { borderRadius: 4 }
        }
    };
    
    new ApexCharts(document.querySelector("#resolutionTrends"), trendsOptions).render();
    new ApexCharts(document.querySelector("#resolutionByPriority"), priorityResOptions).render();
}

// 6. Reports Charts
function renderReportsCharts() {
    // Quarterly Performance Chart
    const quarterlyOptions = {
        chart: { type: 'area', height: 300 },
        series: [{
            name: 'Q1 2024',
            data: [567, 623, 698]
        }, {
            name: 'Q2 2024',
            data: [634, 689, 745]
        }],
        xaxis: {
            categories: ['Month 1', 'Month 2', 'Month 3']
        },
        colors: ['#3b82f6', '#16a34a'],
        fill: { opacity: 0.3 }
    };
    
    // Agent Performance Chart
    const agentOptions = {
        chart: { type: 'bar', height: 300 },
        series: [{
            name: 'Tickets Resolved',
            data: [234, 198, 189, 167]
        }],
        xaxis: {
            categories: ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown']
        },
        colors: ['#8e44ad'],
        plotOptions: {
            bar: { borderRadius: 4 }
        }
    };
    
    new ApexCharts(document.querySelector("#quarterlyPerformance"), quarterlyOptions).render();
    new ApexCharts(document.querySelector("#agentPerformance"), agentOptions).render();
}

// INITIALIZE CHARTS
function initializeCharts() {
    // Check if ApexCharts is loaded
    if (typeof ApexCharts !== 'undefined') {
        new ApexCharts(document.querySelector("#priorityChart"), priorityOptions).render();
        new ApexCharts(document.querySelector("#categoryChart"), categoryOptions).render();
        new ApexCharts(document.querySelector("#trendsChart"), trendsOptions).render();
        new ApexCharts(document.querySelector("#statusChart"), statusOptions).render();
    } else {
        console.error('ApexCharts library not loaded');
    }
}

// TIME RANGE FILTER
function handleTimeRangeChange() {
    const timeRange = document.getElementById('timeRange');
    if (timeRange) {
        timeRange.addEventListener('change', function(e) {
            console.log('Time range changed to:', e.target.value);
            // TODO: In a real application, this would trigger an API call to update the data
            updateDashboardData(e.target.value);
        });
    }
}

// UPDATE DASHBOARD DATA (Placeholder function)
function updateDashboardData(timeRange) {
    // This function would typically:
    // 1. Make an API call to fetch new data based on time range
    // 2. Update the cards with new numbers
    // 3. Update the charts with new data
    // 4. Update the tables with new data
    
    console.log(`Updating dashboard data for time range: ${timeRange}`);
    
    // Example of how you might update card values:
    // updateCardValues(newData);
    // updateCharts(newData);
    // updateTables(newData);
}

// UPDATE CARD VALUES (Helper function)
function updateCardValues(data) {
    // Example implementation:
    // document.querySelector('.card:nth-child(1) .card-number').textContent = data.totalTickets;
    // document.querySelector('.card:nth-child(2) .card-number').textContent = data.resolvedUnclosed;
    // etc...
}

// SIDEBAR NAVIGATION
function handleSidebarNavigation() {
    const sidebarItems = document.querySelectorAll('.sidebar-list-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // TODO: Handle navigation to different views
            console.log('Navigating to:', this.textContent.trim());
        });
    });
}

// RESPONSIVE HANDLING
function handleResponsiveFeatures() {
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const menuIcon = document.querySelector('.menu-icon');
        
        if (sidebarOpen && !sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            if (window.innerWidth <= 992) {
                closeSidebar();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && sidebarOpen) {
            closeSidebar();
        }
    });
}

// INITIALIZE EVERYTHING WHEN DOM IS LOADED
document.addEventListener('DOMContentLoaded', function() {
    console.log('OSTicket Dashboard loaded');
    
    // Initialize all features
    initializeCharts();
    handleTimeRangeChange();
    handleSidebarNavigation();
    handleResponsiveFeatures();
    
    // Auto-refresh data every 5 minutes (optional)
    // setInterval(function() {
    //     updateDashboardData(document.getElementById('timeRange').value);
    // }, 300000);
});

// UTILITY FUNCTIONS
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculatePercentage(part, total) {
    return ((part / total) * 100).toFixed(1);
}

// API INTEGRATION HELPER (For future use)
async function fetchTicketData(endpoint, timeRange = 'quarter') {
    try {
        const response = await fetch(`/api/tickets/${endpoint}?range=${timeRange}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ticket data:', error);
        return null;
        }
    }