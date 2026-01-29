// ======================================
// Old City Mongolia - Booking System
// ======================================

const roomData = {
    male: {
        title: 'Male Room',
        image: 'https://images.unsplash.com/photo-1631049307038-da5ec5d79645?w=600&h=400&fit=crop',
        price: 25,
        beds: 8,
        description: 'A cozy shared dorm with traditional décor, lockers, and easy access to shared facilities.',
        features: [
            '8-bed shared dorm',
            'Lockers & reading lights',
            'Shared bathroom access',
            'Breakfast included'
        ]
    },
    female: {
        title: 'Female Room',
        image: 'https://images.unsplash.com/photo-1631049307038-da5ec5d79645?w=600&h=400&fit=crop',
        price: 25,
        beds: 8,
        description: 'A safe and welcoming women-only dorm with calm lighting and secure storage.',
        features: [
            '8-bed women-only dorm',
            'Secure storage & privacy',
            'Shared bathroom access',
            'Breakfast included'
        ]
    }
};

const tripData = {
    gobi: {
        title: 'Gobi Desert Discovery',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop',
        days: 5,
        nights: 4,
        price: 450,
        description: 'Traverse iconic desert landscapes with flexible pacing and immersive camps beneath the stars.',
        features: [
            'Camel trekking highlights',
            'Dune sunsets & night skies',
            'Guided desert explorations',
            'Traditional ger camping'
        ]
    },
    lakes: {
        title: 'Northern Lakes Expedition',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&h=800&fit=crop',
        days: 6,
        nights: 5,
        price: 650,
        description: 'Discover pristine lakes, cool forests, and cultural encounters in the northern taiga.',
        features: [
            'Lake treks & viewpoints',
            'Kayaking & picnic stops',
            'Nomadic culture visits',
            'Guided wilderness routes'
        ]
    },
    nomadic: {
        title: 'Nomadic Heritage Journey',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop',
        days: 5,
        nights: 4,
        price: 350,
        description: 'Spend time with herding families and experience traditional steppe life and crafts.',
        features: [
            'Homestays with herding families',
            'Horse riding sessions',
            'Traditional cooking',
            'Cultural workshops'
        ]
    },
    wildlife: {
        title: 'Wildlife & Mountain Trek',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
        days: 9,
        nights: 8,
        price: 850,
        description: 'Track rare species and hike scenic ridgelines with expert guidance.',
        features: [
            'Wildlife tracking',
            'Ridge hikes & viewpoints',
            'Photography opportunities',
            'Experienced local guides'
        ]
    }
};

// Booking API Helper
async function createBookingOnServer(booking) {
    const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
    }

    return data;
}

// Price calculation functions
function calculateRoomPrice() {
    const checkInDate = document.getElementById('roomCheckIn')?.value;
    const checkOutDate = document.getElementById('roomCheckOut')?.value;
    const roomType = document.getElementById('roomType')?.value;

    if (!checkInDate || !checkOutDate || !roomType || !roomData[roomType]) {
        const display = document.getElementById('roomPriceDisplay');
        if (display) display.textContent = '$0';
        return null;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const total = nights * roomData[roomType].price;

    document.getElementById('roomPriceDisplay').textContent = `$${total.toFixed(2)}`;
    return { nights, total, roomType };
}

function calculateTripPrice() {
    const tripType = document.getElementById('tripType')?.value;
    const participantsInput = document.getElementById('tripParticipants');
    let participants = parseInt(participantsInput?.value, 10);

    if (!Number.isFinite(participants) || participants < 1) {
        participants = 1;
        if (participantsInput) {
            participantsInput.value = '1';
        }
    }

    if (!tripType || !tripData[tripType]) {
        const display = document.getElementById('tripPriceDisplay');
        if (display) display.textContent = '$0';
        return null;
    }

    const total = participants * tripData[tripType].price;
    document.getElementById('tripPriceDisplay').textContent = `$${total.toFixed(2)}`;
    return { participants, total, tripType };
}

function getSelectedPaymentMethod(inputName) {
    return document.querySelector(`input[name="${inputName}"]:checked`)?.value || 'online';
}

function formatPaymentMethodLabel(method) {
    return method === 'pay_in_person' ? 'Pay in Person' : 'Pay Online';
}

function formatPaymentStatusLabel(method) {
    return method === 'pay_in_person' ? 'Pay on Arrival' : 'Paid (Online)';
}

async function finalizeBooking(booking) {
    if (!booking) return;

    const payload = {
        bookingType: booking.type,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        amount: booking.amount,
        paymentMethod: booking.paymentMethod,
        paymentStatus: booking.paymentStatus
    };

    if (booking.type === 'room') {
        payload.roomType = booking.roomType;
        payload.checkInDate = booking.checkInDate;
        payload.checkOutDate = booking.checkOutDate;
        payload.beds = booking.beds;
    }

    if (booking.type === 'trip') {
        payload.tripType = booking.tripType;
        payload.startDate = booking.startDate;
        payload.participants = booking.participants;
    }

    try {
        const savedBooking = await createBookingOnServer(payload);

        document.getElementById('confirmationRefNumber').textContent = `#${savedBooking.id}`;
        document.getElementById('confirmationGuestName').textContent = booking.guestName;
        document.getElementById('confirmationAmount').textContent = `$${booking.amount.toFixed(2)}`;
        const paymentMethodEl = document.getElementById('confirmationPaymentMethod');
        const paymentStatusEl = document.getElementById('confirmationPaymentStatus');

        if (paymentMethodEl) {
            paymentMethodEl.textContent = formatPaymentMethodLabel(booking.paymentMethod);
        }

        if (paymentStatusEl) {
            paymentStatusEl.textContent = formatPaymentStatusLabel(booking.paymentMethod);
        }

        if (booking.type === 'room') {
            document.getElementById('confirmationDetails').innerHTML = `
                <p><strong>Room Type:</strong> ${roomData[booking.roomType].title}</p>
                <p><strong>Check-in:</strong> ${new Date(booking.checkInDate).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> ${new Date(booking.checkOutDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> ${booking.nights} nights</p>
                <p><strong>Beds:</strong> ${booking.beds}</p>
            `;
        } else if (booking.type === 'trip') {
            document.getElementById('confirmationDetails').innerHTML = `
                <p><strong>Trip:</strong> ${tripData[booking.tripType].title}</p>
                <p><strong>Start Date:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
                <p><strong>Group Size:</strong> ${booking.participants}</p>
                <p><strong>Duration:</strong> ${booking.duration} nights</p>
            `;
        }

        closeModal('paymentModal');
        openModal('confirmationModal');
    } catch (error) {
        alert(error.message || 'Booking failed. Please try again.');
    }
}

// Modal management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// Booking form handlers
function handleRoomBooking(event) {
    event.preventDefault();

    const roomType = document.getElementById('roomType').value;
    const checkInDate = document.getElementById('roomCheckIn').value;
    const checkOutDate = document.getElementById('roomCheckOut').value;
    const beds = parseInt(document.getElementById('roomBeds').value, 10);
    const guestName = document.getElementById('roomGuestName').value;
    const guestEmail = document.getElementById('roomGuestEmail').value;
    const guestPhone = document.getElementById('roomGuestPhone').value;
    const paymentMethod = getSelectedPaymentMethod('roomPaymentMethod');

    if (!guestName || !guestEmail || !guestPhone) {
        alert('Please fill in all guest information');
        return;
    }

    const priceInfo = calculateRoomPrice();
    if (!priceInfo) return;

    window.currentBooking = {
        type: 'room',
        roomType,
        checkInDate,
        checkOutDate,
        beds,
        guestName,
        guestEmail,
        guestPhone,
        nights: priceInfo.nights,
        amount: priceInfo.total,
        paymentMethod,
        paymentStatus: paymentMethod === 'pay_in_person' ? 'pay_on_arrival' : 'paid'
    };

    closeModal('roomBookingModal');
    if (paymentMethod === 'pay_in_person') {
        finalizeBooking(window.currentBooking);
        return;
    }

    openModal('paymentModal');
}

function handleTripBooking(event) {
    event.preventDefault();

    const tripType = document.getElementById('tripType').value;
    const startDate = document.getElementById('tripStartDate').value;
    const participants = parseInt(document.getElementById('tripParticipants').value, 10);
    const guestName = document.getElementById('tripGuestName').value;
    const guestEmail = document.getElementById('tripGuestEmail').value;
    const guestPhone = document.getElementById('tripGuestPhone').value;
    const paymentMethod = getSelectedPaymentMethod('tripPaymentMethod');

    if (!guestName || !guestEmail || !guestPhone) {
        alert('Please fill in all guest information');
        return;
    }

    const priceInfo = calculateTripPrice();
    if (!priceInfo) return;

    if (!Number.isFinite(participants) || participants < 1) {
        alert('Please select at least 1 person for the trip.');
        return;
    }

    window.currentBooking = {
        type: 'trip',
        tripType,
        startDate,
        participants,
        guestName,
        guestEmail,
        guestPhone,
        duration: tripData[tripType].nights,
        amount: priceInfo.total,
        paymentMethod,
        paymentStatus: paymentMethod === 'pay_in_person' ? 'pay_on_arrival' : 'paid'
    };

    closeModal('tripBookingModal');
    if (paymentMethod === 'pay_in_person') {
        finalizeBooking(window.currentBooking);
        return;
    }

    openModal('paymentModal');
}

async function processPayment(event) {
    event.preventDefault();

    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;

    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        alert('Please fill in all payment information');
        return;
    }

    const booking = window.currentBooking;
    if (!booking) return;

    booking.paymentMethod = 'online';
    booking.paymentStatus = 'paid';

    finalizeBooking(booking);
}

// ======================================
// Accommodation & Trip Detail Modals
// ======================================

function showAccommodationDetail(roomKey) {
    const room = roomData[roomKey];
    if (!room) return;

    const detailHTML = `
        <div class="detail-header">
            <h3>${room.title}</h3>
            <div class="detail-price">$${room.price}/night</div>
        </div>
        <div class="detail-description">${room.description}</div>
        <div class="detail-features">
            <h4>Amenities</h4>
            <ul>
                ${room.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <button class="detail-btn" type="button" onclick="openModal('roomBookingModal'); closeModal('accommodationDetailModal')">Book This Room</button>
    `;

    const modal = document.getElementById('accommodationDetailModal');
    if (modal) {
        modal.querySelector('#accommodationDetail').innerHTML = detailHTML;
        openModal('accommodationDetailModal');
    }
}

function showTripDetail(tripKey) {
    const trip = tripData[tripKey];
    if (!trip) return;

    const detailHTML = `
        <div class="detail-header">
            <h3>${trip.title}</h3>
            <div class="detail-price">From $${trip.price}/person</div>
        </div>
        <div class="detail-description">${trip.description}</div>
        <div class="detail-features">
            <h4>Highlights</h4>
            <ul>
                ${trip.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <button class="detail-btn" type="button" onclick="openModal('tripBookingModal'); closeModal('tripDetailModal')">Book This Trip</button>
    `;

    const modal = document.getElementById('tripDetailModal');
    if (modal) {
        modal.querySelector('#tripDetail').innerHTML = detailHTML;
        openModal('tripDetailModal');
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.setAttribute(
                'aria-expanded',
                hamburger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!navMenu || !hamburger) return;
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });

    document.querySelectorAll('.book-btn, .book-trip-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });

    document.querySelectorAll('.room-card').forEach(card => {
        const key = card.dataset.room;
        if (!key || !roomData[key]) return;
        card.addEventListener('click', () => showAccommodationDetail(key));
    });

    document.querySelectorAll('.trip-card').forEach(card => {
        const key = card.dataset.trip;
        if (!key || !tripData[key]) return;
        card.addEventListener('click', () => showTripDetail(key));
    });

    const roomForm = document.getElementById('roomBookingForm');
    if (roomForm) {
        roomForm.addEventListener('change', calculateRoomPrice);
        roomForm.addEventListener('submit', handleRoomBooking);
    }

    const tripForm = document.getElementById('tripBookingForm');
    if (tripForm) {
        tripForm.addEventListener('change', calculateTripPrice);
        tripForm.addEventListener('submit', handleTripBooking);
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', processPayment);
    }

    const closeConfirmBtn = document.getElementById('closeConfirmation');
    if (closeConfirmBtn) {
        closeConfirmBtn.addEventListener('click', function() {
            closeAllModals();
        });
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

