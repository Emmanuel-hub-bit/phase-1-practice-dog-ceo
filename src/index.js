document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Fetch and display random dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = "Random Dog Image";
                imageContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedList = document.getElementById('dog-breeds');
            const breedDropdown = document.getElementById('breed-dropdown');

            function displayBreeds(filteredBreeds) {
                breedList.innerHTML = ''; // Clear the list
                filteredBreeds.forEach(breed => {
                    const liElement = document.createElement('li');
                    liElement.textContent = breed;
                    liElement.addEventListener('click', () => {
                        liElement.style.color = 'blue'; // Change font color to blue on click
                    });
                    breedList.appendChild(liElement);
                });
            }

            const breeds = Object.keys(data.message);
            displayBreeds(breeds); // Display all breeds initially

            // Filter breeds based on dropdown selection
            breedDropdown.addEventListener('change', function() {
                const selectedLetter = breedDropdown.value;
                const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
                displayBreeds(filteredBreeds);
            });
        })
        .catch(error => console.error('Error fetching breeds:', error));
});
