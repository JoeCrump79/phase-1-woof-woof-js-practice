const dogBarDiv = document.getElementById("dog-bar")
console.log(dogBarDiv)

fetch('http://localhost:3000/pups')
    .then(response => {
        console.log(response)
        if (!response.ok) {
            console.log(response.status)
        }
        console.log(response.body)
        return response.json()

    })
    .then(results => {
        console.log(results)
        results.forEach(dog => {
            const dogSpan = document.createElement('span')
            dogSpan.textContent = dog.name
            dogBarDiv.append(dogSpan)


            dogSpan.addEventListener('click', (e) => {
                const dogInfo = document.getElementById('dog-info')
                dogInfo.innerHTML = ""
                const dogImage = document.createElement('img')
                dogImage.src = dog.image
                dogInfo.append(dogImage)
                const dogName = document.createElement('h2')
                dogName.textContent = dog.name
                dogInfo.append(dogName)
                const dogButton = document.createElement('button')
                let dogBehavior;
                if (dog.isGoodDog) {
                    dogBehavior = 'Good Dog!';
                } else {
                    dogBehavior = 'Bad Dog!';
                }
                dogButton.textContent = dogBehavior
                dogButton.addEventListener('click', (e) => {
                    dog.isGoodDog = !dog.isGoodDog
                    if (dog.isGoodDog) {
                        dogBehavior = 'Good Dog!';
                    } else {
                        dogBehavior = 'Bad Dog!';
                    }
                    fetch(`http://localhost:3000/pups/${dog.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ isGoodDog: dog.isGoodDog })
                    })
                        .then(response => {
                            console.log(response)
                            console.log(response.json())
                        })
                    dogButton.textContent = dogBehavior

                    console.log(dog.isGoodDog)
                })
                dogInfo.append(dogButton)
            })

        });


    })
