// Original dice rolling code
var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6
var randomDiceimage1 = "images/dice" + randomNumber1 + ".png"; //dice1.png - dice6.png
var playerFirst = document.querySelector("img.img1").setAttribute("src", randomDiceimage1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1; //1-6
var randomDiceimage2 = "images/dice" + randomNumber2 + ".png"; //dice1.png - dice6.png
var playersecond = document.querySelector("img.img2").setAttribute("src", randomDiceimage2);

// Create sound effect for crackers
function playCrackerSound() {
    // Create audio elements for popping sounds
    const sounds = [];
    const soundCount = 5;
    
    for (let i = 0; i < soundCount; i++) {
        const audio = document.createElement('audio');
        audio.volume = 0.5;
        
        // Use different timing for each pop sound
        setTimeout(() => {
            const oscillator = new (window.AudioContext || window.webkitAudioContext)().createOscillator();
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(800 + Math.random() * 500, oscillator.context.currentTime);
            oscillator.connect(oscillator.context.destination);
            oscillator.start();
            oscillator.stop(oscillator.context.currentTime + 0.1);
        }, i * 300 + Math.random() * 200);
    }
}

// Add paper burst and cracker celebration function
function createCelebrationEffects(winner) {
    // Remove any existing effects
    const existingEffects = document.querySelectorAll('.celebration-effect');
    existingEffects.forEach(c => c.remove());
    
    // Create effects container
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'celebration-effect';
    effectsContainer.style.position = 'fixed';
    effectsContainer.style.top = '0';
    effectsContainer.style.left = '0';
    effectsContainer.style.width = '100%';
    effectsContainer.style.height = '100%';
    effectsContainer.style.pointerEvents = 'none';
    effectsContainer.style.zIndex = '1000';
    document.body.appendChild(effectsContainer);
    
    // Create background flash effect (like a cracker explosion)
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    flash.style.opacity = '0';
    effectsContainer.appendChild(flash);
    
    // Animate flash
    let flashOpacity = 0;
    let flashFading = false;
    
    function animateFlash() {
        if (!flashFading) {
            flashOpacity += 0.1;
            if (flashOpacity >= 0.8) {
                flashFading = true;
            }
        } else {
            flashOpacity -= 0.05;
        }
        
        flash.style.opacity = flashOpacity;
        
        if (flashOpacity > 0) {
            requestAnimationFrame(animateFlash);
        } else {
            flash.remove();
        }
    }
    
    animateFlash();
    
    // Create cracker burst effects
    const burstLocations = [];
    if (winner === 1) {
        // More bursts on player 1 side
        burstLocations.push({x: '20%', y: '30%'}, {x: '25%', y: '60%'}, {x: '15%', y: '40%'});
    } else if (winner === 2) {
        // More bursts on player 2 side
        burstLocations.push({x: '80%', y: '30%'}, {x: '75%', y: '60%'}, {x: '85%', y: '40%'});
    } else {
        // Bursts in the middle for draw
        burstLocations.push({x: '50%', y: '40%'});
    }
    
    // Add some random bursts throughout the screen
    for (let i = 0; i < 5; i++) {
        burstLocations.push({
            x: Math.random() * 80 + 10 + '%',
            y: Math.random() * 80 + 10 + '%'
        });
    }
    
    // Play cracker sound
    playCrackerSound();
    
    // Create paper bursts for each location
    burstLocations.forEach((location, locationIndex) => {
        setTimeout(() => {
            // Play additional cracker sound for each burst with delay
            setTimeout(playCrackerSound, locationIndex * 200);
            
            // Paper colors
            const colors = ['#ff8866', '#66ff88', '#8866ff', '#ffff66', '#ff66ff', '#66ffff', '#ffffff'];
            
            // Create paper pieces
            const particleCount = 80 + Math.floor(Math.random() * 40);
            
            for (let i = 0; i < particleCount; i++) {
                const paper = document.createElement('div');
                paper.className = 'celebration-effect';
                paper.style.position = 'absolute';
                paper.style.left = location.x;
                paper.style.top = location.y;
                
                // Vary paper shape and size
                const isLongStrip = Math.random() > 0.7;
                if (isLongStrip) {
                    paper.style.width = Math.random() * 5 + 2 + 'px';
                    paper.style.height = Math.random() * 30 + 15 + 'px';
                } else {
                    paper.style.width = Math.random() * 12 + 5 + 'px';
                    paper.style.height = Math.random() * 12 + 5 + 'px';
                }
                
                paper.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                paper.style.borderRadius = Math.random() > 0.3 ? (Math.random() * 5) + 'px' : '50%';
                paper.style.opacity = Math.random() * 0.5 + 0.5;
                effectsContainer.appendChild(paper);
                
                // Animate each paper piece
                const angle = Math.random() * Math.PI * 2; // Random direction
                const velocity = 8 + Math.random() * 20; // Faster for more explosive effect
                const rotationSpeed = (Math.random() - 0.5) * 15;
                let rotation = 0;
                
                const xVelocity = velocity * Math.cos(angle);
                const yVelocity = velocity * Math.sin(angle) - 10; // Initial upward boost
                
                let x = 0;
                let y = 0;
                let gravity = 0.3 + Math.random() * 0.4;
                let friction = 0.98;
                
                function animatePaper() {
                    x += xVelocity * friction;
                    y += yVelocity;
                    yVelocity += gravity; // Apply gravity
                    rotation += rotationSpeed;
                    friction *= 0.995; // Slow down over time
                    
                    paper.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                    paper.style.opacity = parseFloat(paper.style.opacity) * 0.995; // Fade out
                    
                    // Remove when out of view or faded
                    if (y > window.innerHeight || x < -window.innerWidth/2 || x > window.innerWidth/2 || parseFloat(paper.style.opacity) < 0.1) {
                        paper.remove();
                    } else {
                        requestAnimationFrame(animatePaper);
                    }
                }
                
                // Add small random delay to each piece for burst effect
                setTimeout(() => {
                    animatePaper();
                }, Math.random() * 200);
            }
        }, locationIndex * 300); // Stagger the bursts
    });
    
    // Remove container after animation completes
    setTimeout(() => {
        if (effectsContainer.parentNode) {
            effectsContainer.remove();
        }
    }, 8000);
}

// Modified winner function to include celebration
function winner() {
    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").innerHTML = "Player 1 Wins!";
        createCelebrationEffects(1); // Celebrate player 1 win
    } else if (randomNumber1 < randomNumber2) {
        document.querySelector("h1").innerHTML = "Player 2 Wins!";
        createCelebrationEffects(2); // Celebrate player 2 win
    } else if (randomNumber1 === randomNumber2) {
        document.querySelector("h1").innerHTML = "Draw!";
        createCelebrationEffects(0); // Small celebration for draw
    }
}

// Add celebration background
function createBackgroundEffect() {
    const bg = document.createElement('div');
    bg.style.position = 'fixed';
    bg.style.top = '0';
    bg.style.left = '0';
    bg.style.width = '100%';
    bg.style.height = '100%';
    bg.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
    bg.style.zIndex = '-1';
    bg.style.pointerEvents = 'none';
    document.body.appendChild(bg);
    
    // Add some floating particles in background
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = Math.random() * 10 + 5 + 'px';
        particle.style.backgroundColor = `hsla(${Math.random() * 360}, 70%, 70%, 0.4)`;
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        bg.appendChild(particle);
        
        // Animate floating
        let y = 0;
        const speed = Math.random() * 2 + 1;
        
        function floatParticle() {
            y -= speed;
            particle.style.transform = `translateY(${y}px) rotate(${y}deg)`;
            
            if (Math.abs(y) > window.innerHeight) {
                y = 0;
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
            }
            
            requestAnimationFrame(floatParticle);
        }
        
        floatParticle();
    }
}

// Run the game and add effects
winner();
createBackgroundEffect();

// Add button to roll dice again
const rollAgainButton = document.createElement('button');
rollAgainButton.textContent = 'Roll Again';
rollAgainButton.style.padding = '10px 20px';
rollAgainButton.style.fontSize = '18px';
rollAgainButton.style.margin = '20px auto';
rollAgainButton.style.display = 'block';
rollAgainButton.style.backgroundColor = '#4CAF50';
rollAgainButton.style.color = 'white';
rollAgainButton.style.border = 'none';
rollAgainButton.style.borderRadius = '5px';
rollAgainButton.style.cursor = 'pointer';
rollAgainButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

rollAgainButton.addEventListener('click', function() {
    location.reload(); // Simple way to roll again
});

document.body.appendChild(rollAgainButton);