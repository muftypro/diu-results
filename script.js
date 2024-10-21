// Fetch student results from the Netlify Function
document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const studentId = document.getElementById('studentId').value;

    // Update the fetch URL to use Netlify Function API
    const response = await fetch(`/api/results?studentId=${studentId}`);
    const results = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Results for Student ID: ${studentId}</h2>`;

    if (results.length > 0) {
        results.forEach(result => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('result-item');
            courseElement.innerHTML = `
                <p><strong>Course:</strong> ${result.courseTitle}</p>
                <p><strong>Grade:</strong> ${result.gradeLetter}</p>
                <p><strong>Credits:</strong> ${result.totalCredit}</p>
                <p><strong>CGPA:</strong> ${result.pointEquivalent}</p>
            `;
            resultsDiv.appendChild(courseElement);
        });
    } else {
        resultsDiv.innerHTML += `<p>No results found for the given Student ID.</p>`;
    }
});

// Add defense result via Netlify Function
document.getElementById('defenseForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const defenseCGPA = parseFloat(document.getElementById('defenseCGPA').value);

    if (!isNaN(defenseCGPA) && defenseCGPA > 0) {
        const response = await fetch('/api/add-defense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ defenseCGPA: defenseCGPA })
        });

        const result = await response.json();
        alert(`Defense result added with CGPA: ${defenseCGPA}`);
    } else {
        alert('Please enter a valid Defense CGPA.');
    }
});






// // Function to fetch student results from the backend


// document.getElementById('studentForm').addEventListener('submit', async function (event) {
//     event.preventDefault();
//     const studentId = document.getElementById('studentId').value;

//     // Fetch the results from backend
//     const response = await fetch(`https://your-backend-api-url/results?studentId=${studentId}`);
//     const results = await response.json();

//     // Display the results on the page
//     const resultsDiv = document.getElementById('results');
//     resultsDiv.innerHTML = `<h2>Results for Student ID: ${studentId}</h2>`;

//     if (results.length > 0) {
//         results.forEach(result => {
//             const courseElement = document.createElement('div');
//             courseElement.classList.add('result-item');
//             courseElement.innerHTML = `
//                 <p><strong>Course:</strong> ${result.courseTitle}</p>
//                 <p><strong>Grade:</strong> ${result.gradeLetter}</p>
//                 <p><strong>Credits:</strong> ${result.totalCredit}</p>
//                 <p><strong>CGPA:</strong> ${result.pointEquivalent}</p>
//             `;
//             resultsDiv.appendChild(courseElement);
//         });
//     } else {
//         resultsDiv.innerHTML += `<p>No results found for the given Student ID.</p>`;
//     }
// });

// // Function to add defense result
// document.getElementById('defenseForm').addEventListener('submit', async function (event) {
//     event.preventDefault();
//     const defenseCGPA = parseFloat(document.getElementById('defenseCGPA').value);

//     if (!isNaN(defenseCGPA) && defenseCGPA > 0) {
//         // Assuming backend supports adding defense result via an API
//         const response = await fetch('https://your-backend-api-url/add-defense', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ defenseCGPA: defenseCGPA })
//         });

//         const result = await response.json();
//         alert(`Defense result added with CGPA: ${defenseCGPA}`);
//     } else {
//         alert('Please enter a valid Defense CGPA.');
//     }
// });
