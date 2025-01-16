// Get the input fields and the result paragraph
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateButton = document.getElementById('calculate');
const resultParagraph = document.getElementById('result');
var tl = gsap.timeline()

// Add an event listener to the calculate button
calculateButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Get the values from the input fields
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    // Check if the values are valid
    if (isNaN(weight) || isNaN(height)) {
        resultParagraph.textContent = 'Please enter valid numbers';
        return;
    }

    // Calculate the BMI
    const bmi = weight / (height * height);

    // Determine the BMI category
    // let category;
    // if (bmi < 18.5) {
    //     category = 'Underweight';
    // } else if (bmi < 25) {
    //     category = 'Normal weight';
    // } else if (bmi < 30) {
    //     category = 'Overweight';
    // } else {
    //     category = 'Obese';
    // }


    if (bmi < 18.5) {
        category = 'Underweight';
        tl.from("p",
            {
                backgroundColor:"blue",
                delay: 1,
                duration: 50,

            }
        )
    } else if (bmi < 25) {
        category = 'Normal weight';
        tl.from("p",
            {
                backgroundColor:"lightblue",
                duration: 50,
                delay: 1,

            }
        )
        
    } else if (bmi < 30) {
        category = 'Overweight';
        tl.from("p",
            {
                backgroundColor:"orange",
                duration: 50,
                delay: 1,

            }
        )
    } else {
        category = 'Obese';
        tl.from("p",
            {
                backgroundColor:"crimson",
                duration: 50,
                delay: 1,

            }
        )
    }



    // Display the result
    resultParagraph.textContent = `Your BMI is ${bmi.toFixed(2)} (${category})`;
});