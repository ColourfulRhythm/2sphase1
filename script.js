document.addEventListener('DOMContentLoaded', function() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isActive = this.classList.contains('active');
            
            // Toggle active state
            this.classList.toggle('active');
            content.classList.toggle('active');
            
            // Smooth scroll to keep content in view if expanding
            if (!isActive) {
                setTimeout(() => {
                    content.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
    });
    
    // Add smooth entrance animation
    const cards = document.querySelectorAll('.zone-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Excel Export Functionality
    const excelExportBtn = document.getElementById('excelExportBtn');
    if (excelExportBtn) {
        excelExportBtn.addEventListener('click', exportToExcel);
    }

    function exportToExcel() {
        // Define the data structure
        const zones = [
            {
                zone: 'Core Infrastructure',
                acreage: 'Across 85 acres',
                budget: '₦350M - ₦450M',
                deliverables: [
                    'Internal roads',
                    'Drainage',
                    'Solar mini-grid',
                    'Boreholes',
                    'Fencing',
                    'Gatehouses',
                    'Security lighting'
                ],
                outcome: 'Land becomes build-ready, credible, and investable'
            },
            {
                zone: 'Wellness Village',
                acreage: '25 acres',
                budget: '₦250M - ₦300M',
                deliverables: [
                    'Therapy pavilion',
                    'Yoga deck',
                    'Juice bar',
                    'Tea house',
                    'Outdoor gym',
                    'Fruit forest',
                    'Eco-spa pods'
                ],
                outcome: 'Memberships, retreats, wellness tourism revenue'
            },
            {
                zone: 'Residential (Starter Phase)',
                acreage: '35 acres (of 35 acres total)',
                budget: '₦300M - ₦400M',
                deliverables: [
                    'Serviced plots',
                    '4–6 show homes',
                    'Daycare/school shell',
                    'Mini park'
                ],
                outcome: 'Plot sales, home sales, cooperative & mortgage inflow'
            },
            {
                zone: 'Agro-Tusks (Agro & Storage)',
                acreage: '10-20 acres',
                budget: '₦150M - ₦200M',
                deliverables: [
                    'Aggregation sheds',
                    'Cold storage',
                    'Processing area',
                    'Truck access roads',
                    'Cultivation'
                ],
                outcome: 'Produce sales, off-take contracts, impact funding'
            },
            {
                zone: 'Creative & Streaming Village',
                acreage: '5 acres',
                budget: '₦250M - ₦300M',
                deliverables: [
                    'Modular studios',
                    'Outdoor sets',
                    'Co-working pavilion',
                    'Post-production suite',
                    'Residency pods'
                ],
                outcome: 'Studio rentals, brand deals, creator partnerships'
            }
        ];

        // Create workbook
        const wb = XLSX.utils.book_new();

        // Create summary sheet
        const summaryData = [
            ['2 Seasons Phase 1 - N1.5 Billion Infrastructure Breakdown'],
            [],
            ['Summary'],
            ['Total Budget', '₦1.3B - ₦1.65B'],
            ['Total Acreage', '~85 Acres'],
            ['Number of Zones', '5 Zones'],
            []
        ];
        const summaryWS = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summaryWS, 'Summary');

        // Create detailed breakdown sheet
        const breakdownData = [
            ['Zone', 'Acreage', 'Budget Allocation', 'Key Deliverables', 'Primary Outcome / Revenue Trigger']
        ];

        zones.forEach(zone => {
            const deliverables = zone.deliverables.join('; ');
            breakdownData.push([
                zone.zone,
                zone.acreage,
                zone.budget,
                deliverables,
                zone.outcome
            ]);
        });

        const breakdownWS = XLSX.utils.aoa_to_sheet(breakdownData);
        
        // Set column widths
        breakdownWS['!cols'] = [
            { wch: 30 }, // Zone
            { wch: 25 }, // Acreage
            { wch: 20 }, // Budget
            { wch: 50 }, // Deliverables
            { wch: 50 }  // Outcome
        ];

        XLSX.utils.book_append_sheet(wb, breakdownWS, 'Breakdown');

        // Create detailed deliverables sheet
        const deliverablesData = [
            ['Zone', 'Deliverable']
        ];

        zones.forEach(zone => {
            zone.deliverables.forEach(deliverable => {
                deliverablesData.push([zone.zone, deliverable]);
            });
        });

        const deliverablesWS = XLSX.utils.aoa_to_sheet(deliverablesData);
        deliverablesWS['!cols'] = [
            { wch: 30 },
            { wch: 40 }
        ];
        XLSX.utils.book_append_sheet(wb, deliverablesWS, 'Deliverables');

        // Generate filename with current date
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const filename = `2_Seasons_Phase_1_Breakdown_${dateStr}.xlsx`;

        // Write and download
        XLSX.writeFile(wb, filename);
    }
});

