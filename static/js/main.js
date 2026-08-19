/* =====================================================
   IKS SEARCH & FILTER
===================================================== */

const searchInput = document.getElementById("searchInput");

const clearSearch = document.getElementById("clearSearch");

const categoryCards = document.querySelectorAll(".category-card");

const filterButtons = document.querySelectorAll(".filter-btn");

const resultCount = document.getElementById("resultCount");

const noResults = document.getElementById("noResults");


let currentFilter = "all";


function filterCategories() {

    if (!searchInput) {
        return;
    }


    const searchValue =
        searchInput.value.toLowerCase().trim();


    let visibleCount = 0;


    categoryCards.forEach(function (card) {

        const name =
            card.dataset.name || "";

        const description =
            card.dataset.description || "";

        const category =
            card.dataset.category || "";


        const matchesSearch =
            name.includes(searchValue) ||
            description.includes(searchValue);


        const matchesFilter =
            currentFilter === "all" ||
            category === currentFilter;


        if (matchesSearch && matchesFilter) {

            card.classList.remove("hidden");

            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });


    /* Update result count */

    if (resultCount) {

        resultCount.textContent = visibleCount;

    }


    /* Show / hide no results */

    if (noResults) {

        if (visibleCount === 0) {

            noResults.classList.add("show");

        } else {

            noResults.classList.remove("show");

        }

    }


    /* Show / hide clear button */

    if (clearSearch) {

        if (searchValue.length > 0) {

            clearSearch.style.display = "block";

        } else {

            clearSearch.style.display = "none";

        }

    }

}


/* Search while typing */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterCategories
    );

}


/* =====================================================
   FILTER BUTTONS
===================================================== */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Remove active from all buttons */

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Activate clicked button */

        button.classList.add("active");


        /* Store selected filter */

        currentFilter =
            button.dataset.filter;


        filterCategories();

    });

});


/* =====================================================
   CLEAR SEARCH
===================================================== */

if (clearSearch) {

    clearSearch.addEventListener("click", function () {

        searchInput.value = "";

        currentFilter = "all";


        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        const allButton =
            document.querySelector(
                '.filter-btn[data-filter="all"]'
            );


        if (allButton) {

            allButton.classList.add("active");

        }


        filterCategories();

        searchInput.focus();

    });

}