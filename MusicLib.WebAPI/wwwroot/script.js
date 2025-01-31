document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.card-header');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            const currentlyActive = document.querySelector('.collapse.show');
            if (currentlyActive && currentlyActive !== this.nextElementSibling) {
                currentlyActive.classList.remove('show');
            }
            this.nextElementSibling.classList.toggle('show');
        });
    });
});