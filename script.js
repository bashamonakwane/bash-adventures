// Popup Logic
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.destination-card');
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const closePopup = document.getElementById('closePopup');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img').src;
            const title = card.querySelector('h2').innerText;
            const description = card.querySelector('p').innerText;

            popupImage.src = img;
            popupTitle.textContent = title;
            popupDescription.textContent = description;

            popup.style.display = 'flex';
            setTimeout(() => {
                popup.classList.add('show');
            }, 10); // Tiny delay to trigger the animation
            
        });
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Auto-play (optional)
function autoSlide() {
    plusSlides(1);
    setTimeout(autoSlide, 5000); // 5 seconds
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    autoSlide(); // comment out if you want manual only
});
        // Navigation functions
        function nextSection(currentId, nextId, currentStepId, nextStepId) {
            // Validate current section before proceeding
            if (validateSection(currentId)) {
                document.getElementById(currentId).classList.remove('active');
                document.getElementById(nextId).classList.add('active');
                
                document.getElementById(currentStepId).classList.remove('active');
                document.getElementById(nextStepId).classList.add('active');
                
                // Scroll to top of the form
                document.getElementById(nextId).scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        function prevSection(currentId, prevId, currentStepId, prevStepId) {
            document.getElementById(currentId).classList.remove('active');
            document.getElementById(prevId).classList.add('active');
            
            document.getElementById(currentStepId).classList.remove('active');
            document.getElementById(prevStepId).classList.add('active');
            
            // Scroll to top of the form
            document.getElementById(prevId).scrollIntoView({ behavior: 'smooth' });
        }
        
        // Basic validation for each section
        function validateSection(sectionId) {
            const section = document.getElementById(sectionId);
            const inputs = section.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
                
                // Special validation for email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.style.borderColor = 'red';
                        isValid = false;
                    }
                }
                
                // Special validation for card number
                if (input.id === 'card-number' && input.value.trim()) {
                    const cardRegex = /^\d{16}$/;
                    const cleanedValue = input.value.replace(/\s/g, '');
                    if (!cardRegex.test(cleanedValue)) {
                        input.style.borderColor = 'red';
                        isValid = false;
                    }
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields correctly.');
            }
            
            return isValid;
        }
        
        // Submit booking function
        function submitBooking() {
            if (validateSection('payment-section')) {
                // Get all the booking details
                const package = document.querySelector('input[name="package"]:checked').value;
                const fullName = document.getElementById('full-name').value;
                const email = document.getElementById('email').value;
                const travelDate = document.getElementById('travel-date').value;
                const travelers = document.getElementById('travelers').value;
                
                // Calculate total price based on package and number of travelers
                let basePrice = 0;
                switch(package) {
                    case 'Safari Adventure': basePrice = 1900; break;
                    case 'Beach Holiday': basePrice = 1800; break;
                    case 'Mountain Trekking': basePrice = 2500; break;
                }
                
                let totalPrice = basePrice;
                if (travelers === '2') totalPrice = basePrice * 1.8; // Discount for 2
                if (travelers === '3') totalPrice = basePrice * 2.5; // Discount for 3
                if (travelers === '4') totalPrice = basePrice * 3.0; // Discount for 4
                if (travelers === '5+') totalPrice = basePrice * 3.5; // Group discount
                
                // Update confirmation section with booking details
                document.getElementById('summary-package').textContent = `Package: P{package}`;
                document.getElementById('summary-date').textContent = `Travel Date: P{new Date(travelDate).toLocaleDateString()}`;
                document.getElementById('summary-travelers').textContent = `Travelers: P{travelers}`;
                document.getElementById('summary-total').textContent = `Total Price: PP{totalPrice.toFixed(2)}`;
                
                // Show confirmation and hide payment section
                document.getElementById('payment-section').classList.remove('active');
                document.getElementById('confirmation-section').classList.add('active');
                
                // Update steps
                document.getElementById('step3').classList.remove('active');
                document.getElementById('step4').classList.add('active');
                
                // Scroll to confirmation
                document.getElementById('confirmation-section').scrollIntoView({ behavior: 'smooth' });
                
                // In a real application, you would send this data to a server here
                console.log('Booking submitted:', {
                    package,
                    fullName,
                    email,
                    travelDate,
                    travelers,
                    totalPrice
                });
            }
        }
