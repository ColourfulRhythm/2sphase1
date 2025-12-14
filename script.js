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

    // View Toggle Functionality
    const viewToggleBtn = document.getElementById('viewToggleBtn');
    const zonesGrid = document.querySelector('.zones-grid');
    const summaryCard = document.querySelector('.summary-card');
    const sheetView = document.getElementById('sheetView');
    let isSheetView = false;

    if (viewToggleBtn) {
        viewToggleBtn.addEventListener('click', function() {
            isSheetView = !isSheetView;
            
            if (isSheetView) {
                // Switch to sheet view
                zonesGrid.style.display = 'none';
                summaryCard.style.display = 'none';
                sheetView.style.display = 'block';
                viewToggleBtn.querySelector('span').textContent = 'Switch to Card Format';
                viewToggleBtn.classList.add('active');
            } else {
                // Switch to card view
                zonesGrid.style.display = 'grid';
                summaryCard.style.display = 'flex';
                sheetView.style.display = 'none';
                viewToggleBtn.querySelector('span').textContent = 'Switch to Sheet Format';
                viewToggleBtn.classList.remove('active');
            }
        });
    }
});

