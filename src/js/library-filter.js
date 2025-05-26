document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.tag-filter-btn');
    const libraryItems = document.querySelectorAll('.library-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state of buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedFormat = button.getAttribute('data-format');

            // Filter library items
            libraryItems.forEach(item => {
                if (selectedFormat === 'all') {
                    item.style.display = '';
                } else {
                    const itemFormat = item.getAttribute('data-format');
                    item.style.display = (itemFormat === selectedFormat) ? '' : 'none';
                }
            });
        });
    });
}); 