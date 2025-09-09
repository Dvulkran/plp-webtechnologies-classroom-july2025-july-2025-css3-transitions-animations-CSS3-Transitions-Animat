// Global variables to demonstrate scope
let globalCounter = 0;
const globalColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

// Part 2: JavaScript Functions with Parameters and Return Values

/**
 * Generates a random number between min and max (inclusive)
 * Demonstrates: parameters, return value, local scope
 */
function generateRandomNumber(min, max) {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue;
}

/**
 * Calculates sum of two random numbers and shows local vs global scope
 * Demonstrates: local variables, function composition, return values
 */
function calculateRandomSum() {
    // Local variables - only exist within this function
    const localNum1 = generateRandomNumber(1, 100);
    const localNum2 = generateRandomNumber(1, 100);
    const localSum = localNum1 + localNum2;
    
    // Accessing global variable
    globalCounter++;
    
    return {
        num1: localNum1,
        num2: localNum2,
        sum: localSum,
        calculationCount: globalCounter
    };
}

/**
 * Generates a random color from global array
 * Demonstrates: accessing global variables, array methods
 */
function getRandomColor() {
    const randomIndex = generateRandomNumber(0, globalColors.length - 1);
    return globalColors[randomIndex];
}

/**
 * Demonstrates scope concepts clearly
 * Shows difference between local and global variables
 */
function demonstrateScope() {
    const localMessage = "This is a LOCAL variable";
    let localCounter = 10; // Local variable with same name as global
    
    // Modify global variable
    globalCounter += 5;
    
    return {
        local: localMessage,
        localCounter: localCounter,
        globalCounter: globalCounter,
        explanation: "Notice how local and global variables can have same names but different values!"
    };
}

// Part 3: Functions to control CSS animations dynamically

/**
 * Adds animation class to element and removes it after animation
 * Demonstrates: DOM manipulation, timing functions, parameters
 */
function triggerAnimation(elementId, animationClass, duration = 1000) {
    const element = document.getElementById(elementId);
    if (!element) return false;
    
    // Remove existing animation classes first
    element.classList.remove('bounce-animation', 'slide-animation');
    
    // Add new animation class
    element.classList.add(animationClass);
    
    // Remove animation class after it completes
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
    
    return true;
}

/**
 * Toggles card flip animation
 * Demonstrates: class manipulation, event handling
 */
function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
    
    // Add a little shake effect for fun
    cardElement.style.animation = 'none';
    setTimeout(() => {
        cardElement.style.animation = '';
    }, 10);
}

/**
 * Shows/hides modal with smooth animations
 * Demonstrates: state management, CSS class toggling
 */
function toggleModal(show = null) {
    const modal = document.getElementById('modalOverlay');
    const isVisible = modal.classList.contains('show');
    
    if (show === null) {
        // Toggle current state
        modal.classList.toggle('show');
    } else if (show && !isVisible) {
        modal.classList.add('show');
    } else if (!show && isVisible) {
        modal.classList.remove('show');
    }
    
    return modal.classList.contains('show');
}

/**
 * Controls loading animation state
 * Demonstrates: boolean parameters, element state management
 */
function toggleLoadingSpinner(show, duration = 3000) {
    const spinner = document.getElementById('loadingSpinner');
    
    if (show) {
        spinner.classList.add('show');
        // Auto-hide after specified duration
        setTimeout(() => {
            spinner.classList.remove('show');
        }, duration);
    } else {
        spinner.classList.remove('show');
    }
    
    return spinner.classList.contains('show');
}

/**
 * Updates result display with smooth transition
 * Demonstrates: DOM content manipulation, styling
 */
function updateResultDisplay(elementId, content, backgroundColor = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Add update animation
    element.style.transform = 'scale(0.95)';
    element.style.opacity = '0.7';
    
    setTimeout(() => {
        element.innerHTML = content;
        if (backgroundColor) {
            element.style.backgroundColor = backgroundColor + '40'; // Add transparency
        }
        
        // Restore normal state
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 150);
}

// Event Listeners - Setting up all interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Part 2: JavaScript Functions Demo Event Listeners
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const result = calculateRandomSum();
        const displayText = `
            <strong>Random Numbers:</strong> ${result.num1} + ${result.num2}<br>
            <strong>Sum:</strong> ${result.sum}<br>
            <strong>Times calculated:</strong> ${result.calculationCount}
        `;
        updateResultDisplay('mathResult', displayText, '#4ecdc4');
    });
    
    document.getElementById('colorBtn').addEventListener('click', function() {
        const randomColor = getRandomColor();
        const displayText = `
            <strong>Random Color:</strong><br>
            <div style="width: 60px; height: 60px; background: ${randomColor}; border-radius: 50%; margin: 10px auto;"></div>
            <strong>${randomColor}</strong>
        `;
        updateResultDisplay('colorResult', displayText, randomColor);
    });
    
    document.getElementById('scopeBtn').addEventListener('click', function() {
        const scopeDemo = demonstrateScope();
        const displayText = `
            <strong>Local Counter:</strong> ${scopeDemo.localCounter}<br>
            <strong>Global Counter:</strong> ${scopeDemo.globalCounter}<br>
            <small style="opacity: 0.8;">${scopeDemo.explanation}</small>
        `;
        updateResultDisplay('scopeResult', displayText, '#ff9a9e');
    });
    
    // Part 3: Combined CSS + JavaScript Event Listeners
    
    // Card flip animations
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            flipCard(this);
        });
    });
    
    // Animation control buttons
    document.getElementById('bounceBtn').addEventListener('click', function() {
        triggerAnimation('animatedBox', 'bounce-animation');
    });
    
    document.getElementById('slideBtn').addEventListener('click', function() {
        triggerAnimation('animatedBox', 'slide-animation');
    });
    
    // Modal controls
    document.getElementById('modalBtn').addEventListener('click', function() {
        toggleModal(true);
    });
    
    document.getElementById('closeModal').addEventListener('click', function() {
        toggleModal(false);
    });
    
    // Close modal when clicking overlay
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            toggleModal(false);
        }
    });
    
    // Loading spinner demo
    document.getElementById('loadingBtn').addEventListener('click', function() {
        toggleLoadingSpinner(true, 4000);
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = 'Start Loading';
            this.disabled = false;
        }, 4000);
    });
    
    // Bonus: Add some random sparkle effects
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'fadeInDown 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            document.body.removeChild(sparkle);
        }, 2000);
    }
    
    // Create random sparkles every 5 seconds
    setInterval(createSparkle, 5000);
});

// Bonus: Keyboard shortcuts for better UX
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        toggleModal(false);
    }
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        triggerAnimation('animatedBox', 'bounce-animation');
    }
});

// Export functions for potential reuse (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateRandomNumber,
        calculateRandomSum,
        getRandomColor,
        demonstrateScope,
        triggerAnimation,
        flipCard,
        toggleModal,
        toggleLoadingSpinner
    };
}